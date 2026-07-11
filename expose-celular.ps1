# ============================================================
#  Expor o servidor Vite (WSL2) para o celular na mesma rede
#  >>> RODE ESTE SCRIPT NO WINDOWS, EM POWERSHELL COMO ADMIN <<<
# ============================================================
#  Como usar:
#   1. Abra o PowerShell como Administrador.
#   2. Cole e rode:
#        powershell -ExecutionPolicy Bypass -File \\wsl$\<sua-distro>\home\josehenrique\karine\convite-casamento\expose-celular.ps1
#      (ou navegue ate a pasta e rode  .\expose-celular.ps1)
# ============================================================

$port = 5173

# Descobre o IP atual do WSL automaticamente (forca a distro Ubuntu,
# pois a distro padrao pode ser outra, ex: docker-desktop/BusyBox)
$raw = (wsl -d Ubuntu hostname -I) -join " "
$wslIp = ($raw -split "\s+" | Where-Object { $_ -match '^\d+\.\d+\.\d+\.\d+$' } | Select-Object -First 1)

if (-not $wslIp) {
  Write-Host "ERRO: nao consegui detectar o IP do WSL (Ubuntu)." -ForegroundColor Red
  Write-Host "Confira se a distro se chama 'Ubuntu' com: wsl -l -v" -ForegroundColor Red
  exit 1
}
Write-Host "IP do WSL detectado: $wslIp" -ForegroundColor Cyan

# Remove regra antiga (se existir) e recria o encaminhamento de porta
netsh interface portproxy delete v4tov4 listenport=$port listenaddress=0.0.0.0 2>$null | Out-Null
netsh interface portproxy add    v4tov4 listenport=$port listenaddress=0.0.0.0 connectport=$port connectaddress=$wslIp

# Libera a porta no Firewall do Windows
netsh advfirewall firewall delete rule name="WSL Vite $port" 2>$null | Out-Null
netsh advfirewall firewall add rule name="WSL Vite $port" dir=in action=allow protocol=TCP localport=$port | Out-Null

# Mostra o IP do Windows na rede Wi-Fi/Ethernet para usar no celular
$lanIp = (Get-NetIPAddress -AddressFamily IPv4 |
  Where-Object { $_.IPAddress -like "192.168.*" -or $_.IPAddress -like "10.*" -or $_.IPAddress -like "172.1*" } |
  Where-Object { $_.InterfaceAlias -notmatch "WSL|vEthernet|Loopback" } |
  Select-Object -First 1).IPAddress

Write-Host ""
Write-Host "==================================================" -ForegroundColor Green
Write-Host " Pronto! No celular (mesma rede Wi-Fi), abra:" -ForegroundColor Green
Write-Host "    http://$lanIp`:$port" -ForegroundColor Yellow
Write-Host "==================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Encaminhamentos ativos:" -ForegroundColor Cyan
netsh interface portproxy show v4tov4
