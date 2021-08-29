taiKhoan = 12345;
matKhau = 999;
checkLogin = false;
var stt = 0;
var tam = 0;
var time = new Date();

class cayATM {
    constructor(name, pin, soDu, tkMuonChuyen, soTienChuyen, soTienRut, PINcu, newPIN1, newPIN2) {
        this.name = name;
        this.pin = pin;
        this.soDu = soDu = 90000;
        this.tkMuonChuyen = tkMuonChuyen;
        this.soTienChuyen = soTienChuyen;
        this.soTienRut = soTienRut;
        this.PINcu = PINcu;
        this.newPIN1 = newPIN1;
        this.newPIN2 = newPIN2;
    }

    kiemTra() {

        console.log(this.pin);
        console.log(this.name);
        if (this.name == taiKhoan && this.pin == matKhau) {

            checkLogin = true;
            console.log(checkLogin);
            alert("Thẻ: Nguyễn Khắc Hùng - Số tiền của bạn là: " + this.soDu + " USD")
        } else {
            checkLogin = false;
            alert("Tài khoản hoặc mật khẩu không đúng!")
        }
    }
    checkSendMoney() {
        if (checkLogin == false) {
            alert("Vui lòng đăng nhập trước!")
        }
        else {
            this.send()
        }
    }
    
    send() {
        if (this.soTienChuyen == '' || this.tkMuonChuyen == '') {
            alert("Vui lòng nhập đầy đủ thông tin giao dịch!")
        }
        else if (this.soTienChuyen <= this.soDu && checkLogin === true) {
            alert("Chuyển tiền thành công, số tiền còn lại của bạn là: " + (this.soDu = this.soDu - this.soTienChuyen) + " USD")
            this.lichSuChuyenTien()
        } else if (this.soTienChuyen > this.soDu && checkLogin === true) {
            alert("Tài khoản của bạn không đủ để thực hiện giao dịch!")
        }
    }
    lichSuChuyenTien(){
        var table = document.getElementById("myTable");
        tam++;
        var newRow = table.insertRow(tam)
        var column1 = newRow.insertCell(0)
        stt = stt + 1
        var cell1 = document.createTextNode(stt)
        column1.appendChild(cell1)
    
        var column2 = newRow.insertCell(1)
        var cell2 = document.createTextNode(this.soTienChuyen + " USD")
        column2.appendChild(cell2)
    
        var column3 = newRow.insertCell(2)
        var cell3 = document.createTextNode("Chuyển tiền")
        column3.appendChild(cell3)
    
        var column4 = newRow.insertCell(3)
        var cell4 = document.createTextNode(this.tkMuonChuyen)
        column4.appendChild(cell4)

        var column5 = newRow.insertCell(4)
        var cell5 = document.createTextNode(time)
        column5.appendChild(cell5)
    }
    checkRutTien() {
        if (checkLogin == false) {
            alert("Vui lòng đăng nhập trước!")
        } else {
            this.rutTien()
        }
    }
    rutTien() {
        if (this.soTienRut == '' || this.pin == '') {
            alert("Vui lòng nhập đầy đủ thông tin!")
        } else if (this.soTienRut <= this.soDu && this.pin == matKhau) {
            this.soDu = this.soDu - this.soTienRut
            alert("Rút tiền thành công-Số dư của bạn còn: " + (this.soDu) + " USD")
            this.lichSuRutTien()
        }
        else if (this.pin != matKhau) {
            alert("Mã PIN sai, vui lòng nhập lại!")
        } else {
            alert("Tài khoản của bạn không đủ để thực hiện cuộc giao dịch này!")
        }
    }
    lichSuRutTien(){
        var table = document.getElementById("myTable");
        tam++;
        var newRow = table.insertRow(tam)
        var column1 = newRow.insertCell(0)
        stt = stt + 1
        var cell1 = document.createTextNode(stt)
        column1.appendChild(cell1)
    
        var column2 = newRow.insertCell(1)
        var cell2 = document.createTextNode(this.soTienRut + " USD")
        column2.appendChild(cell2)
    
        var column3 = newRow.insertCell(2)
        var cell3 = document.createTextNode("Rút tiền")
        column3.appendChild(cell3)
        var column4 = newRow.insertCell(3)
        var cell4 = document.createTextNode(this.name)
        column4.appendChild(cell4)
        var column5 = newRow.insertCell(4)
        var cell5 = document.createTextNode(time)
        column5.appendChild(cell5)
    }
    checkDoiPIN() {
        if (checkLogin == false) {
            alert("Vui lòng đăng nhập trước!")
        } else {
            this.doiPIN()
        }
    }
    doiPIN() {
        if (this.PINcu == '' || this.newPIN1 == '' || this.newPIN2 == '') {
            alert("Vui lòng nhập đầy đủ thông tin!")
        } else if (this.PINcu == matKhau && this.newPIN1 == this.newPIN2 && this.newPIN1 != matKhau && this.newPIN2 != matKhau) {
            matKhau = this.newPIN2
            alert("Đổi PIN thành công, PIN mới của bạn là: " + matKhau)
        } else if (this.PINcu != matKhau) {
            alert("Mã PIN không chính xác. Hãy thử lại !")
        } else if (this.PINcu == matKhau && this.newPIN1 == matKhau && this.newPIN2 == matKhau) {
            alert("Mã PIN mới không được trùng với mã PIN cũ! Hãy thử lại với mã PIN khác ")
        }
        else {
            alert("Mã PIN mới không khớp !")
        }
    }
}

function alertInfo() {
    var name = document.getElementById("soThe").value
    var pin = document.getElementById("PINLogin").value
    var tkMuonChuyen = document.getElementById("tkChuyenTien").value
    var soTienChuyen = document.getElementById("chuyenTien").value
    var soTienRut = document.getElementById("rutTien").value
    var soDu = document.getElementsByTagName("soDu").value
    var alertObject = new cayATM(name, pin, soDu, tkMuonChuyen, soTienChuyen, soTienRut)
    alertObject.kiemTra()
}

function sendMoney() {
    var name = document.getElementById("soThe").value
    var pin = document.getElementById("PINLogin").value
    var tkMuonChuyen = document.getElementById("tkChuyenTien").value
    var soTienChuyen = document.getElementById("chuyenTien").value
    var soTienRut = document.getElementById("rutTien").value
    var soDu = document.getElementsByTagName("soDu").value
    var alertObject = new cayATM(name, pin, soDu, tkMuonChuyen, soTienChuyen, soTienRut)
    alertObject.checkSendMoney()
}

function withdrawMoney() {
    var name = document.getElementById("soThe").value
    var pin = document.getElementById("PINRutTien").value
    var tkMuonChuyen = document.getElementById("tkChuyenTien").value
    var soTienChuyen = document.getElementById("chuyenTien").value
    var soTienRut = document.getElementById("rutTien").value
    var soDu = document.getElementsByTagName("soDu").value
    var alertObject = new cayATM(name, pin, soDu, tkMuonChuyen, soTienChuyen, soTienRut)
    alertObject.checkRutTien()
}
function doiMaPINatm() {
    var name = document.getElementById("soThe").value
    var pin = document.getElementById("PINLogin").value
    var tkMuonChuyen = document.getElementById("tkChuyenTien").value
    var soTienChuyen = document.getElementById("chuyenTien").value
    var soTienRut = document.getElementById("rutTien").value
    var soDu = document.getElementsByTagName("soDu").value
    var PINcu = document.getElementById("PINcu").value
    var newPIN1 = document.getElementById("newPIN1").value
    var newPIN2 = document.getElementById("newPIN2").value
    var alertObject = new cayATM(name, pin, soDu, tkMuonChuyen, soTienChuyen, soTienRut, PINcu, newPIN1, newPIN2)
    alertObject.checkDoiPIN()
}