# PowerShell Automation: 5 Scripts Every IT Pro Should Know

PowerShell has revolutionized how IT professionals manage Windows environments. After years of manual processes, these five automation scripts have transformed my daily workflow and saved countless hours of repetitive work.

## 1. Bulk User Creation Script

Creating multiple users manually is tedious and error-prone. This script reads from a CSV file and creates Active Directory users in bulk:

```powershell
# Import users from CSV and create AD accounts
$users = Import-Csv "C:\Scripts\NewUsers.csv"
foreach ($user in $users) {
    New-ADUser -Name $user.Name -SamAccountName $user.Username -UserPrincipalName "$($user.Username)@domain.com" -Path $user.OU -Enabled $true
}
```

## 2. System Health Check

This comprehensive script checks multiple system metrics and generates a health report:

```powershell
# System health monitoring script
$computerName = $env:COMPUTERNAME
$report = @{
    ComputerName = $computerName
    CPUUsage = (Get-WmiObject win32_processor | Measure-Object -property LoadPercentage -Average).Average
    MemoryUsage = [math]::Round(((Get-WmiObject -Class Win32_OperatingSystem).TotalVisibleMemorySize - (Get-WmiObject -Class Win32_OperatingSystem).FreePhysicalMemory) / (Get-WmiObject -Class Win32_OperatingSystem).TotalVisibleMemorySize * 100, 2)
    DiskSpace = Get-WmiObject -Class Win32_LogicalDisk | Select-Object DeviceID, @{Name="FreeSpace(GB)";Expression={[math]::Round($_.FreeSpace/1GB,2)}}
}
$report | ConvertTo-Json
```

## 3. Software Installation Checker

Quickly verify if specific software is installed across multiple machines:

```powershell
# Check for installed software
$softwareName = "Microsoft Office"
$computers = Get-Content "C:\Scripts\computers.txt"

foreach ($computer in $computers) {
    $software = Invoke-Command -ComputerName $computer -ScriptBlock {
        Get-WmiObject -Class Win32_Product | Where-Object {$_.Name -like "*$using:softwareName*"}
    }
    Write-Output "$computer: $($software.Name) - $($software.Version)"
}
```

## 4. Event Log Analysis

Automate the process of scanning event logs for critical errors:

```powershell
# Scan event logs for critical errors in the last 24 hours
$yesterday = (Get-Date).AddDays(-1)
$criticalEvents = Get-WinEvent -FilterHashtable @{LogName='System','Application'; Level=1,2; StartTime=$yesterday}

$criticalEvents | Select-Object TimeCreated, Id, LevelDisplayName, LogName, Message | 
Export-Csv "C:\Reports\CriticalEvents_$(Get-Date -Format 'yyyyMMdd').csv" -NoTypeInformation
```

## 5. Automated Backup Verification

Ensure your backups are running successfully:

```powershell
# Backup verification script
$backupPath = "\\server\backups"
$today = Get-Date -Format "yyyy-MM-dd"
$expectedBackups = @("ServerA", "ServerB", "ServerC")

foreach ($server in $expectedBackups) {
    $backupFile = Get-ChildItem -Path $backupPath -Filter "*$server*$today*" -ErrorAction SilentlyContinue
    if ($backupFile) {
        Write-Output "✓ Backup found for $server: $($backupFile.Name)"
    } else {
        Write-Warning "✗ Missing backup for $server on $today"
    }
}
```

## Best Practices for PowerShell Automation

1. **Error Handling**: Always include try-catch blocks for robust scripts
2. **Logging**: Implement comprehensive logging for troubleshooting
3. **Testing**: Test scripts in development environments first
4. **Documentation**: Comment your code and maintain script documentation
5. **Security**: Use secure methods for handling credentials

## Conclusion

These five scripts represent just the beginning of what's possible with PowerShell automation. Start with simple tasks and gradually build complexity as your skills develop. The time invested in learning PowerShell pays dividends in increased efficiency and reduced manual errors.

Remember: if you find yourself doing the same task more than three times, it's probably worth automating!