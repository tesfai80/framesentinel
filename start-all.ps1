# FrameSentinel - Local Development Startup Script
# Run all services: Backend API, Admin Dashboard, Marketing Site

Write-Host "========================================" -ForegroundColor Green
Write-Host "  FrameSentinel - Starting All Services" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Check if running in correct directory
if (-not (Test-Path "main.py")) {
    Write-Host "ERROR: Please run this script from the FrameSentinel root directory" -ForegroundColor Red
    exit 1
}

# Function to kill process on port
function Stop-PortProcess {
    param([int]$Port)
    
    $process = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
    if ($process) {
        Write-Host "Stopping process on port $Port..." -ForegroundColor Yellow
        Stop-Process -Id $process -Force -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 1
    }
}

# Kill existing processes on ports
Write-Host "Checking for existing processes..." -ForegroundColor Yellow
Stop-PortProcess -Port 8000
Stop-PortProcess -Port 3000
Stop-PortProcess -Port 3001
Stop-PortProcess -Port 3002
Write-Host "Ports cleared" -ForegroundColor Green
Write-Host ""

# Function to start a service in a new window
function Start-Service {
    param(
        [string]$Name,
        [string]$Command,
        [string]$WorkingDir,
        [string]$Color
    )
    
    Write-Host "Starting $Name..." -ForegroundColor $Color
    
    $scriptBlock = @"
`$Host.UI.RawUI.WindowTitle = '$Name'
Set-Location '$WorkingDir'
Write-Host '========================================' -ForegroundColor $Color
Write-Host '  $Name' -ForegroundColor $Color
Write-Host '========================================' -ForegroundColor $Color
Write-Host ''
$Command
"@
    
    Start-Process powershell -ArgumentList "-NoExit", "-Command", $scriptBlock
    Start-Sleep -Seconds 2
}

# Get current directory
$rootDir = Get-Location

# 1. Start Backend API (FastAPI)
Write-Host ""
Write-Host "[1/3] Backend API (FastAPI)" -ForegroundColor Cyan
Start-Service -Name "Backend API - Port 8000" `
              -Command "python main.py" `
              -WorkingDir $rootDir `
              -Color "Cyan"

Write-Host "Waiting for Backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# 2. Start Admin Dashboard (Next.js)
Write-Host ""
Write-Host "[2/3] Admin Dashboard (Next.js)" -ForegroundColor Magenta
$adminDir = Join-Path $rootDir "admin-dashboard"
Start-Service -Name "Admin Dashboard - Port 3001" `
              -Command "npm run dev" `
              -WorkingDir $adminDir `
              -Color "Magenta"

Write-Host "Waiting for Admin Dashboard to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# 3. Start Marketing Site (Next.js)
Write-Host ""
Write-Host "[3/3] Marketing Site (Next.js)" -ForegroundColor Green
$marketingDir = Join-Path $rootDir "marketing-site"
Start-Service -Name "Marketing Site - Port 3000" `
              -Command "npm run dev" `
              -WorkingDir $marketingDir `
              -Color "Green"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  All Services Started Successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Services Running:" -ForegroundColor White
Write-Host "  Backend API:       http://localhost:8000" -ForegroundColor Cyan
Write-Host "  API Docs:          http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host "  Admin Dashboard:   http://localhost:3001" -ForegroundColor Magenta
Write-Host "  Marketing Site:    http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C in each window to stop services" -ForegroundColor Yellow
Write-Host ""
Write-Host "Tip: Create an admin user with: python create_admin.py" -ForegroundColor Yellow
Write-Host ""
