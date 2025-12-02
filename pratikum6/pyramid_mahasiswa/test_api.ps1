# Script Testing API Matakuliah
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   TESTING API MATAKULIAH" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$baseUrl = "http://localhost:6543/api/matakuliah"

# Test 1: GET All Matakuliah
Write-Host "[TEST 1] GET All Matakuliah" -ForegroundColor Yellow
Write-Host "URL: GET $baseUrl" -ForegroundColor Gray
try {
    $response = Invoke-WebRequest -Uri $baseUrl -Method GET
    Write-Host "Status: $($response.StatusCode) OK" -ForegroundColor Green
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
} catch {
    Write-Host "ERROR: $_" -ForegroundColor Red
}
Write-Host ""

# Test 2: GET Matakuliah by ID
Write-Host "[TEST 2] GET Matakuliah by ID" -ForegroundColor Yellow
Write-Host "URL: GET $baseUrl/1" -ForegroundColor Gray
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/1" -Method GET
    Write-Host "Status: $($response.StatusCode) OK" -ForegroundColor Green
    $response.Content | ConvertFrom-Json | ConvertTo-Json
} catch {
    Write-Host "ERROR: $_" -ForegroundColor Red
}
Write-Host ""

# Test 3: POST (Tambah Matakuliah)
Write-Host "[TEST 3] POST - Tambah Matakuliah Baru" -ForegroundColor Yellow
Write-Host "URL: POST $baseUrl" -ForegroundColor Gray
$newData = @{
    kode_mk = "IF301"
    nama_mk = "Pemrograman Web"
    sks = 3
    semester = 5
} | ConvertTo-Json
Write-Host "Body: $newData" -ForegroundColor Gray
try {
    $response = Invoke-WebRequest -Uri $baseUrl -Method POST -Body $newData -ContentType "application/json"
    Write-Host "Status: $($response.StatusCode) Created" -ForegroundColor Green
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
} catch {
    Write-Host "ERROR: $_" -ForegroundColor Red
}
Write-Host ""

# Test 4: PUT (Update Matakuliah)
Write-Host "[TEST 4] PUT - Update Matakuliah" -ForegroundColor Yellow
Write-Host "URL: PUT $baseUrl/1" -ForegroundColor Gray
$updateData = @{
    sks = 4
    nama_mk = "Algoritma dan Pemrograman Lanjut"
} | ConvertTo-Json
Write-Host "Body: $updateData" -ForegroundColor Gray
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/1" -Method PUT -Body $updateData -ContentType "application/json"
    Write-Host "Status: $($response.StatusCode) OK" -ForegroundColor Green
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
} catch {
    Write-Host "ERROR: $_" -ForegroundColor Red
}
Write-Host ""

# Test 5: DELETE (Hapus Matakuliah)
Write-Host "[TEST 5] DELETE - Hapus Matakuliah" -ForegroundColor Yellow
Write-Host "URL: DELETE $baseUrl/4" -ForegroundColor Gray
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/4" -Method DELETE
    Write-Host "Status: $($response.StatusCode) OK" -ForegroundColor Green
    $response.Content | ConvertFrom-Json | ConvertTo-Json
} catch {
    Write-Host "ERROR: $_" -ForegroundColor Red
}
Write-Host ""

# Final: GET All Matakuliah (untuk melihat hasil perubahan)
Write-Host "[FINAL] GET All Matakuliah (Setelah Perubahan)" -ForegroundColor Yellow
Write-Host "URL: GET $baseUrl" -ForegroundColor Gray
try {
    $response = Invoke-WebRequest -Uri $baseUrl -Method GET
    Write-Host "Status: $($response.StatusCode) OK" -ForegroundColor Green
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
} catch {
    Write-Host "ERROR: $_" -ForegroundColor Red
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   TESTING SELESAI" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan
