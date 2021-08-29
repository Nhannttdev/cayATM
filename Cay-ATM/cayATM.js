class Person {
    constructor(id, name, phone) {
        this.id = id;
        this.name = name;
        this.phone = phone;
    }
}

class Bank {
    constructor(code, name, address) {
        this.code = code;
        this.name = name;
        this.address = address;
    }
}

class ATM {
    constructor(code, address, bankCode) {
        this.code = code
        this.address = address
        this.bankCode = bankCode
    }
    login(creditCards, cardNumber, PIN, name){
        creditCards.forEach(currentCreditCard => {
            if (currentCreditCard.number == cardNmuber && currentCreditCard.PIN == PIN)
                return true
            else {
                return false 
            }
        })
    }
    isCardNumberValid(cardNumber){
        if (cardNumber.length == 13){
            return true
        }
        return false  
    }
    isPINValid(PIN){
        if (PIN.length == 6){
            return true
        }
        return false
    }
    tranferMoney( cardNumberReceiver, amount){
        
    }
    isCardNumberReceiverValid (creditCardNumberReceiver) {
        if (creditCardNumberReceiver.length == 13) {
            return true
        }
        return false
    }
    isAmoutValid(amount){
        if(amount > 0){
            return true
        }
        return false
    }

    widthDrawMoney(cardNumber, amount){

    }
    changePIN(cardNumber, oldIN, newPIN){

    }
}

class CreditCard {
    constructor(number, PIN, amount, expireDate, CVV, bankCode, personID){
        this.number = number
        this.PIN = PIN
        this.amount = amount
        this.expireDate = expireDate
        this.CVV = CVV
        this.bankCode = bankCode
        this.personID = personID
    }
}

class TransactionHistory {
    constructor(id, creditCardNumberSender,creditCardNumberReceiver, atmCode, time, amount){
        this.id = id
        this.creditCcreditCardNumberSenderardNumber = creditCardNumberSender
        this.creditCardNumberReceiver = creditCardNumberReceiver
        this.atmCode = atmCode
        this.time = time
        this.amount = amount
    }
}

var persons = []
let chuong = new Person(1, "Nguyễn Khả Chương", "023546359")
persons.push(chuong)
let nhan = new Person(2, "Nguyễn Thị Thanh Nhàn", "0868138916")
persons.push(nhan)
let hung = new Person(3, "Nguyễn Khắc Hùng", "0123456789")
persons.push(hung)

var banks = []
let bidv = new Bank("BIDV", "Ngân hàng Thương mại cổ phần Đầu tư và Phát triển Việt Nam", "Cầu Giấy" )
banks.push(bidv)
let tcb = new Bank("TCB", "Ngân hàng Thương mại cổ phần Đầu tư và Phát triển Việt Nam", "Hoàng Cầu" )
banks.push(tcb)
let acb = new Bank("ACB", "Ngân hàng thương mại cổ phần Á Châu", "Xuân Thủy" )
banks.push(acb)

var atms = []
let bidvAtmCauGiay = new ATM("BIDV-ATM","Cầu Giấy", "BIDV")
atms.push(bidvAtmCauGiay)
let tcbAtmHoangCau = new ATM("TCB-ATM", "Hoàng Cầu", "TCB")
atms.push(tcbAtmHoangCau)
let acbAtmXuanThuy = new ATM("ACB-ATM", "Xuân Thủy", "ACB")
atms.push(acbAtmXuanThuy)

var creditCards = []
let chuongCard = new CreditCard("123","123456", 5000000,"12/08/2025","222","BIDV",1)
creditCards.push(chuongCard)
let nhanCard = new CreditCard("124","123789", 10000000,"01/08/2026","333","TCB",2)
creditCards.push(nhanCard)
let hungCard  = new CreditCard("125","123654", 15000000,"02/04/2030","444","ACB",3)
creditCards.push(hungCard)

var transactionHistories = []
let transactionChuongBIDVCard = new TransactionHistory("001", "123", "BIDV-ATM", "12/07/2020", 4000000)
transactionHistories.push(transactionChuongBIDVCard)
let transactionNhanTCBCard = new TransactionHistory("002", "124", "TCB-ATM", "11/02/2020", 6000000)
transactionHistories.push(transactionNhanTCBCard)
let transactionHungACBCard = new TransactionHistory("003", "125", "ACB-ATM", "01/07/2020", 5000000)
transactionHistories.push(transactionHungACBCard)

var currentLoginCardNumber
var currentReceiveCardNumber

function login(name) {
    let chosenATMCode = document.getElementById("choseAtmId").value 
    atms.forEach(currentATM => {
        if(currentATM.code == chosenATMCode) {
            let userCardNumber = document.getElementById("cardLogin").value
            let userCardPIN = document.getElementById("PINLogin").value

            let isUserCardValid = currentATM.isCardNumberValid(userCardNumber)
            let isUserCardPINValid = currentATM.isPINValid(userCardPIN)

            if (isUserCardValid && isUserCardPINValid){
                let isLoginSuccess = currentATM.login(creditCards, userCardNumber,userCardPIN)
                if (isLoginSuccess) {
                    currentLoginCardNumber = userCardNumber
                    document.getElementById("cardInfo").innerHTML = "Xin chào" + name 
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
function transferMoney(amount){
    if (currentLoginCardNumber != undefined) {
        let cardReceiver = document.getElementById("receiver").value
        let amountToSend = document.getElementById("amount").value

        let isCardReceiverValid = isCardNumberReceiverValid(cardReceiver)
        let isAmoutToSendValid = isAmoutValid(amountToSend)

        if(isCardReceiverValid && isAmoutToSendValid) {
            let isLoginSuccess = transferMoney(cardReceiver, amountToSend)
            if (isLoginSuccess) {
                currentReceiveCardNumber = cardReceiver
                if (amountToSend <= amount ){
                    alert("Giao dịch thành công!")   
                }  else  {
                    alert("Tài khoản của bạn không đủ để thực hiện giao dịch này!")
                }
                transationHistories.push(transaction)
            } 
        } else {
            alert("Giao dịch thất bại!")   
        }
    }
}
function widthDrawMoney() {
    
}
