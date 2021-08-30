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
    login(creditCards, cardNumber, PIN) {
        return new Promise((resolve, reject) => {
            creditCards.forEach(currentCreditCard => {
                if (currentCreditCard.number == cardNumber && currentCreditCard.PIN == PIN) {
                    return resolve(currentCreditCard)
                }
            })
            return reject(null)
        })
    }
    isCardNumberValid(cardNumber) {
        if (cardNumber.length == 13) {
            return true
        }
        return false
    }
    isPINValid(PIN) {
        if (PIN.length == 6) {
            return true
        }
        return false
    }
    tranferMoney(creditCards, cardNumberReceiver, amountToSend) {
        return new Promise((resolve, reject) => {
            creditCards.forEach(currentReceiverCreditCard => {
                console.log("ngoai ham");
                if (currentReceiverCreditCard.number == cardNumberReceiver && amountToSend <= currentAmount) {
                    console.log("trong ham");
                    return resolve(true)
                }
            })
            return reject(null)
        })
    }
    isCardNumberReceiverValid(creditCardNumberReceiver) {
        if (creditCardNumberReceiver.length == 13) {
            return true
        }
        return false
    }
    isAmountValid(amount) {
        let amountValue = parseInt(amount)
        if (amountValue >= 0) {
            return true
        }
        return false
    }

    widthDrawMoney(pin, amountToWidthDraw) {
        return new Promise((resolve, reject) => {
            if (pin == currentPIN && amountToWidthDraw <= currentAmount) {
                console.log("tien hien tai", currentAmount);
                return resolve(true)
            }
            return reject(null)
        })
    }

    changePIN(oldPIN, newPIN) {
        return new Promise((resolve, reject) => {
            if (currentPIN == oldPIN && currentPIN != newPIN) {
                return resolve(true)
            }
            return reject(null)
        })
    }
}

class CreditCard {
    constructor(number, PIN, amount, expireDate, CVV, bankCode, personID) {
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
    constructor(id, creditCardNumberSender, creditCardNumberReceiver, atmCode, time, amount) {
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
let bidv = new Bank("BIDV", "Ngân hàng Thương mại cổ phần Đầu tư và Phát triển Việt Nam", "Cầu Giấy")
banks.push(bidv)
let tcb = new Bank("TCB", "Ngân hàng Thương mại cổ phần Đầu tư và Phát triển Việt Nam", "Hoàng Cầu")
banks.push(tcb)
let acb = new Bank("ACB", "Ngân hàng thương mại cổ phần Á Châu", "Xuân Thủy")
banks.push(acb)

var atms = []
let bidvAtmCauGiay = new ATM("BIDV-ATM", "Cầu Giấy", "BIDV")
atms.push(bidvAtmCauGiay)
let tcbAtmHoangCau = new ATM("TCB-ATM", "Hoàng Cầu", "TCB")
atms.push(tcbAtmHoangCau)
let acbAtmXuanThuy = new ATM("ACB-ATM", "Xuân Thủy", "ACB")
atms.push(acbAtmXuanThuy)

var creditCards = []
let chuongCard = new CreditCard("0123456789127", "123456", 5000000, "12/08/2025", "222", "BIDV", 1)
creditCards.push(chuongCard)
let nhanCard = new CreditCard("0123456789122", "123789", 10000000, "01/08/2026", "333", "TCB", 2)
creditCards.push(nhanCard)
let hungCard = new CreditCard("0123456789121", "123654", 15000000, "02/04/2030", "444", "ACB", 3)
creditCards.push(hungCard)


var transactionHistories = []
let transactionChuongBIDVCard = new TransactionHistory("001", "0123456789127", "BIDV-ATM", "12/07/2020", 4000000)
transactionHistories.push(transactionChuongBIDVCard)
let transactionNhanTCBCard = new TransactionHistory("002", "0123456789122", "TCB-ATM", "11/02/2020", 6000000)
transactionHistories.push(transactionNhanTCBCard)
let transactionHungACBCard = new TransactionHistory("003", "0123456789121", "ACB-ATM", "01/07/2020", 5000000)
transactionHistories.push(transactionHungACBCard)

var currentLoginCardNumber
var currentReceiverCardNumber
var currentAmount
var currentPIN

function login() {
    let chosenATMCode = document.getElementById("choseAtmId").value
    atms.forEach(currentATM => {
        if (currentATM.code == chosenATMCode) {

            let userCardNumber = document.getElementById("cardLogin").value
            let userCardPIN = document.getElementById("PINLogin").value

            let isUserCardValid = currentATM.isCardNumberValid(userCardNumber)
            let isUserCardPINValid = currentATM.isPINValid(userCardPIN)
            if (isUserCardValid && isUserCardPINValid) {

                currentATM.login(creditCards, userCardNumber, userCardPIN).then(result => {
                    console.log("eeeee", result);
                    currentLoginCardNumber = userCardNumber
                    currentPIN = result.PIN
                    persons.forEach(currentPerson => {
                        if (currentPerson.id == result.personID) {
                            let currentName = currentPerson.name
                            currentAmount = result.amount

                            document.getElementById("cardInfo").innerHTML = "Xin chào" + " " + currentName + "!"
                            document.getElementById("amount").innerHTML = "Số tiền" + " " + ":" + " " + currentAmount

                        }
                    })
                }).catch(error => {
                    alert("Đăng nhập không thành công!")
                })
            }
            else {
                alert("Thẻ hoặc mã PIN không hợp lệ. Vui lòng thử lại!")
            }
        }
    })
}
function transferMoney() {
    let chosenATMCode = document.getElementById("choseAtmId").value
    atms.forEach(currentATM => {
        if (currentATM.code == chosenATMCode) {

            if (currentLoginCardNumber != undefined) {
                let cardReceiver = document.getElementById("receiver").value
                let amountToSend = document.getElementById("amountToSend").value

                let isCardReceiverValid = currentATM.isCardNumberReceiverValid(cardReceiver)
                let isAmoutToSendValid = currentATM.isAmountValid(amountToSend)
                console.log("ketqua", isCardReceiverValid, isAmoutToSendValid)

                if (isCardReceiverValid && isAmoutToSendValid) {
                    console.log("truoc");
                    currentATM.tranferMoney(creditCards, cardReceiver, amountToSend).then(resultTranfer => {
                        console.log("Sau");
                        currentReceiverCardNumber = cardReceiver
                        alert("Giao dịch thành công!")
                        currentAmount = currentAmount - amountToSend
                        document.getElementById("amount").innerHTML = "Số tiền" + " " + ":" + " " + currentAmount

                    }).catch(errorTranfer => {
                        alert("Tài khoản của bạn không đủ để thực hiện giao dịch này!")
                    })
                    // var transaction = new TransactionHistory()
                    // transationHistories.push(transaction)
                } else {
                    alert("Giao dịch không thành công!")
                }
            }
        }
    })
}
function widthDrawMoney() {
    let chosenATMCode = document.getElementById("choseAtmId").value
    atms.forEach(currentATM => {
        if (currentATM.code == chosenATMCode) {
            console.log("ATM", currentATM);
            if (currentLoginCardNumber != undefined) {
                let amountToWidthDraw = document.getElementById("amountToWeithDraw").value
                let pin = document.getElementById("pin").value

                let isAmountToWidthDrawValid = currentATM.isAmountValid(amountToWidthDraw)
                let isPINValid = currentATM.isPINValid(pin)

                if (isAmountToWidthDrawValid && isPINValid) {

                    currentATM.widthDrawMoney(pin, amountToWidthDraw).then(resultWidthDraw => {
                        alert("Rút tiền thành công!")
                        currentAmount = currentAmount - amountToWidthDraw
                        document.getElementById("amount").innerHTML = "Số tiền" + " " + ":" + " " + currentAmount

                    }).catch(err => {
                        alert("Tài khoản của bạn không đủ!")
                    })
                } else {
                    alert("Rút tiền không thành công")
                }

            }
        }
    })
}
function changePIN() {
    let chosenATMCode = document.getElementById("choseAtmId").value
    atms.forEach(currentATM => {
        if (currentATM.code == chosenATMCode) {
            if (currentLoginCardNumber != undefined) {
                let oldPin = document.getElementById("oldPin")
                let newPin = document.getElementById("newPin")
                let reNewPin = document.getElementById("reNewPin")

                // let isOldPinValid = currentATM.isPINValid(oldPin)
                let isNewPinValid = currentATM.isPINValid(newPin)
                let isReNewPinValid = currentATM.isPINValid(reNewPin)
                console.log("doi pin", oldPin, isNewPinValid, isReNewPinValid);

                if (oldPin, isNewPinValid, isReNewPinValid) {
                    currentATM.changePIN(oldPIN, newPIN).then(resultPin => {
                        currentPIN = newPIN
                        alert("Đổi mã pin thành công!")
                    }).catch(errorPin => {
                        alert("Mã PIN mới không được trùng với mã PIN hiện tại")
                    })
                } else {
                    alert("Đổi mã pin không thành công!")
                }
            }
        }
    })
}
