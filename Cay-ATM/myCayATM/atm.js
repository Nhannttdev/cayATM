
class Person {
    constructor (id, name, phone) {
        this.id = id
        this.name = name
        this.phone = phone
    }
}


class Bank {
    constructor (code, name, address) {
        this.code = code
        this.name = name
        this.address = address
    }
}


class ATM {
    constructor (code, address, bankCode) {
        this.code = code
        this.address = address
        this.bankCode = bankCode
    }

    login (creditcards, cardNumber, PIN) {
        // Hai em tham khảo: Promise hoặc async-await
        // creditcards.forEach(currentCreditCard => {
        //   if (currentCreditCard.number == cardNumber && currentCreditCard.PIN == PIN) {
        //       return true
        //   } else {
        //       return false
        //   }
        // })
        return true
    }


    isPINValid(PIN) {
        if (PIN.length == 6) {
            return true
        }
        return false
    }

    isCardNumberValid(cardNumber) {
        if (cardNumber.length == 13) {
            return true
        }
        return false
    }

    transferMoney(cardNumberSender, cardNumberReciver, amount) {

    }

    widthDrawMoney(cardNumber, amount) {

    }

    changePIN(cardNumber, oldPIN, newPIN) {

    }
}


class CreditCard {
    constructor (number, PIN, amount, expiredDate, CVV, bankCode, personID) {
        this.number = number
        this.PIN = PIN
        this.amount = amount
        this.expiredDate = expiredDate
        this.CVV = CVV
        this.bankCode = bankCode
        this.personID = personID
    }
}


class TransactionHistory {
    constructor (id, atmCode, creditCardNumberSender, cardNumberReceiver, time, amount) {
        this.id = id
        this.atmCode = atmCode
        this.creditCardNumberSender = creditCardNumberSender
        this.cardNumberReceiver = cardNumberReceiver
        this.time = time
        this.amount = amount
    }
}

// Bước1: Khởi tạo dữ liệu
var persons = []
let chuong = new Person(1, "Nguyen Kha Chuong", "0374647306")
persons.push(chuong)
let hung = new Person(2, "Nguyen Khac Hung", "0987665432")
persons.push(hung)
let nhan = new Person(3, "Nguyen Thi Thanh Nhan", "0966873214")
persons.push(nhan)

var banks = []
let acb = new Bank("ACB", "Ngân hàng thương mại cổ phần Á Châu", "Số 23 đường Nguyễn Trãi, Hà Đông, Hà Nội")
banks.push(acb)
let tcb = new Bank("Techcombank", "Ngân hàng Thương mại cổ phần Kỹ Thương Việt Nam", "48 Dịch Vọng Hậu")
banks.push(tcb)
let bidv = new Bank("BIDV", "Ngân hàng Thương mại cổ phần Đầu tư và Phát triển Việt Nam", "120 Trần Bình")
banks.push(bidv)

var atms = []
let atm01 = new ATM("ACB-ATM-01", "98/12 Cầu Giấy", "ACB")
atms.push(atm01)
let atm02 = new ATM("ACB-ATM-02", "189 Hoàng Cầu", "ACB")
atms.push(atm02)
let atm03 = new ATM("BIDV-ATM-01", "92 Lạc Long Quân", "BIDV")
atms.push(atm03)
let atm04 = new ATM("TCB-ATM-01", "26 Quang Trung", "Techcombank")

var creditCards = []
let chuongCardBIDV = new CreditCard("0123456789123", "123467", 10000000, "23/08/2025", "123", "BIDV", 1)
creditCards.push(chuongCardBIDV)

var currentLoginCardNumber
var transationHistories = []

function login() {
    let chosenATMCode = document.getElementById("choseATMID").value
    atms.forEach(currentATM => {
        if (currentATM.code == chosenATMCode) {
            let userCardNumber = document.getElementById("soThe").value
            let userCardPIN = document.getElementById("PINLogin").value

            let isUserCardValid = currentATM.isCardNumberValid(userCardNumber)
            let isUserCardPINValid = currentATM.isPINValid(userCardPIN)

            if (isUserCardValid && isUserCardPINValid) {
                let isLoginSuccess = currentATM.login(creditCards, userCardNumber, userCardPIN)
                if (isLoginSuccess) {
                    currentLoginCardNumber = userCardNumber
                    // Set lại câu xin chào
                    // document.getElementById("cardInfo").innerHTML = "Xin chào " + userCardNumber
                    alert("Đăng nhập thành công!")

                } else {
                    alert("Đăng nhập thất bại!")
                }
            } else {
                alert("Thẻ hoặc mã PIN không hợp lệ. Vui lòng thử lại!")
            }
        }
    })
}

function transferMoney() {
    if (currentLoginCardNumber != undefined) {
        // Kiểm tra thông tin nhập vào hợp lệ hay không?
        //
        //
        // 
        // var transaction = new TransactionHistory()
        // //lưu vào mảng transationHistories 1 phần tử transaction history
        // transationHistories.push(transaction)
        

    } else {
        alert("Vui lòng đăng nhập trước khi dùng tính năng này!")
    }
}

function widthDrawMoney() {

}

function changePIN() {

}












































