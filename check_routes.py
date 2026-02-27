from main import app

print("Registered routes:")
for route in app.routes:
    if hasattr(route, 'path'):
        print(f"{route.methods if hasattr(route, 'methods') else 'N/A'} {route.path}")
