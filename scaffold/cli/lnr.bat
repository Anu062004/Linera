@echo off
setlocal enabledelayedexpansion

set CMD=%1
set APP=%2

if "%CMD%"=="new" (
    if "%APP%"=="" (
        echo ❌ Error: Please provide an app name
        echo Usage: lnr.bat new ^<app-name^>
        exit /b 1
    )
    
    if exist "%APP%" (
        echo ❌ Error: Directory '%APP%' already exists
        exit /b 1
    )
    
    set TEMPLATE_PATH=%~dp0..\templates
    echo 🧩 Creating Linera app '%APP%'...
    
    mkdir "%APP%"
    xcopy "%TEMPLATE_PATH%\contract-template\*" "%APP%\contract\" /E /I /Q
    xcopy "%TEMPLATE_PATH%\frontend-template\*" "%APP%\frontend\" /E /I /Q
    xcopy "%TEMPLATE_PATH%\operator-template\*" "%APP%\operator\" /E /I /Q
    
    echo ✅ Linera app scaffold created at %APP%/
    echo.
    echo Next steps:
    echo   cd %APP%
    echo   lnr.bat build
    echo   lnr.bat deploy
    goto :eof
)

if "%CMD%"=="build" (
    echo 🧱 Building contract...
    cargo build --manifest-path contract\Cargo.toml --target wasm32-unknown-unknown --release
    echo ⚡ Building frontend...
    npm run build --prefix frontend
    echo ✅ Build complete!
    goto :eof
)

if "%CMD%"=="deploy" (
    echo 🚀 Deploying to Linera testnet...
    linera publish --application .\contract\target\wasm32-unknown-unknown\release\*.wasm --json > deploy-log.json
    echo ✅ Deployment complete. Log saved to deploy-log.json
    goto :eof
)

if "%CMD%"=="dev" (
    echo 🔧 Starting development mode...
    echo Contract: cargo watch -x "build --target wasm32-unknown-unknown"
    echo Frontend: npm run dev --prefix frontend
    goto :eof
)

if "%CMD%"=="test" (
    echo 🧪 Running tests...
    cargo test --manifest-path contract\Cargo.toml
    npm test --prefix frontend
    goto :eof
)

echo 🧩 Linera Scaffold Platform
echo.
echo Usage: lnr.bat {new^|build^|deploy^|dev^|test} [app-name]
echo.
echo Commands:
echo   new ^<name^>  - Create a new Linera app
echo   build         - Build contract and frontend
echo   deploy        - Deploy to Linera testnet
echo   dev           - Start development mode
echo   test          - Run tests
echo.
echo Examples:
echo   lnr.bat new my-app
echo   lnr.bat build
echo   lnr.bat deploy
