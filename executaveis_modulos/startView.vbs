strComputer ="."

set objWMIService = GetObject("winmgmts:" _
	& "{impersonationLevel=impersonate}!\\" & strComputer & "\root\cimv2")

set colProcesses=objWMIService.ExecQuery _
	("Select * from Win32_Process Where Name = 'HotelLumiar.exe'")

For Each Processo In colProcesses
	msgbox"Programa ja aberto ou em andamento de abertura!",vbInformation,"Hotel Lumiar - Aviso"
	WScript.Quit
Next

Set WshShell = WScript.CreateObject( "WScript.shell" )
WshShell.Run "C:\\hotellumiar-x64\\frontend\\HotelLumiar.exe",0,0
WScript.Quit