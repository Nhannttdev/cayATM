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
                if (currentReceiverCreditCard.number == cardNumberReceiver && amountToSend <= currentAmount) {
                    return resolve(currentReceiverCreditCard)
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
                return resolve(true)
            }
            return reject(null)
        })
    }

    changePIN(oldPin, newPin) {
        return new Promise((resolve, reject) => {
            if (oldPin == currentPIN && newPin != currentPIN) {
                return resolve(true)
            }
            return reject(null)
        })
    }
    tranferHistories(type) {
        var time = new Date().toLocaleTimeString()
        var newTranferObject = new TransactionHistory(currentReceiveName, currentaddressATM, time, amountToSend, amountToWidthDraw, type)
        transactionHistories = transactionHistories.concat(
            newTranferObject
        )
        let tableContent =
            `<tr>
                <th>STT</th>
                <th>S??? ti???n giao d???ch</th>
                <th>Lo???i giao d???ch</th>
                <th>Ng?????i nh???n</th>
                <th>Th???i gian</th>
                <th>N??i th???c hi???n</th>    
            </tr>`
        transactionHistories.forEach((transaction, si) => {
            let isTransfer = transaction.type == 'transfer';

            si++;
            tableContent +=
                `<tr>
                    <td>${si}</td>
                    <td>${isTransfer ? transaction.amountToSend : transaction.amountToWidthDraw}</td>
                    <td>${isTransfer ? 'Chuy???n ti???n ' : 'R??t ti???n'}</td>
                    <td>${isTransfer ? transaction.currentReceiveName : ""}</td>
                    <td>${transaction.time}</td>
                    <td>${transaction.currentaddressATM}</td>
                </tr>`
        })
        document.getElementById("my-table").innerHTML = tableContent;

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
    constructor(currentReceiveName, currentaddressATM, time, amountToSend, amountToWidthDraw, type) {
        this.currentReceiveName = currentReceiveName
        this.currentaddressATM = currentaddressATM
        this.time = time
        this.amountToSend = amountToSend
        this.amountToWidthDraw = amountToWidthDraw
        this.type = type
    }

}

var persons = []
let chuong = new Person(1, "Nguy???n Kh??? Ch????ng", "023546359")
persons.push(chuong)
let nhan = new Person(2, "Nguy???n Th??? Thanh Nh??n", "0868138916")
persons.push(nhan)
let hung = new Person(3, "Nguy???n Kh???c H??ng", "0123456789")
persons.push(hung)

var banks = []
let bidv = new Bank("BIDV", "Ng??n h??ng Th????ng m???i c??? ph???n ?????u t?? v?? Ph??t tri???n Vi???t Nam", "ATM-C???u Gi???y")
banks.push(bidv)
let tcb = new Bank("TCB", "Ng??n h??ng Th????ng m???i c??? ph???n ?????u t?? v?? Ph??t tri???n Vi???t Nam", "ATM-Ho??ng C???u")
banks.push(tcb)
let acb = new Bank("ACB", "Ng??n h??ng th????ng m???i c??? ph???n ?? Ch??u", "ATM-Xu??n Th???y")
banks.push(acb)

var atms = []
let bidvAtmCauGiay = new ATM("BIDV-ATM", "ATM-C???u Gi???y", "BIDV")
atms.push(bidvAtmCauGiay)
let tcbAtmHoangCau = new ATM("TCB-ATM", "ATM-Ho??ng C???u", "TCB")
atms.push(tcbAtmHoangCau)
let acbAtmXuanThuy = new ATM("ACB-ATM", "ATM-Xu??n Th???y", "ACB")
atms.push(acbAtmXuanThuy)

var creditCards = []
let chuongCard = new CreditCard("0123456789127", "123456", 5000000, "12/08/2025", "222", "BIDV", 1)
creditCards.push(chuongCard)
let nhanCard = new CreditCard("0123456789122", "123789", 10000000, "01/08/2026", "333", "TCB", 2)
creditCards.push(nhanCard)
let hungCard = new CreditCard("0123456789121", "123654", 15000000, "02/04/2030", "444", "ACB", 3)
creditCards.push(hungCard)


var transactionHistories = []


var currentLoginCardNumber
var currentReceiverCardNumber
var currentAmount
var currentPIN
var amountToSend = 0
var amountToWidthDraw = 0
var currentReceiveName
var currentaddressATM
var chosenATMCode



function login() {
    let chosenATMCode = document.getElementById("choseAtmId").value
    atms.forEach(currentATM => {
        if (currentATM.code == chosenATMCode) {
            currentaddressATM = currentATM.address
            let userCardNumber = document.getElementById("cardLogin").value
            let userCardPIN = document.getElementById("PINLogin").value

            let isUserCardValid = currentATM.isCardNumberValid(userCardNumber)
            let isUserCardPINValid = currentATM.isPINValid(userCardPIN)
            if (isUserCardValid && isUserCardPINValid) {

                currentATM.login(creditCards, userCardNumber, userCardPIN).then(result => {
                    currentLoginCardNumber = userCardNumber
                    currentPIN = result.PIN
                    persons.forEach(currentPerson => {
                        if (currentPerson.id == result.personID) {
                            let currentName = currentPerson.name
                            currentAmount = result.amount

                            document.getElementById("cardInfo").innerHTML = "Xin ch??o" + " " + currentName + "!"
                            document.getElementById("amount").innerHTML = "S??? d?? t??i kho???n c???a b???n l??:" + " " + ":" + " " + currentAmount + "VN??"

                        }
                    })
                }).catch(error => {
                    alert("????ng nh???p kh??ng th??nh c??ng!")
                })
            }
            else {
                alert("Th??? ho???c m?? PIN kh??ng h???p l???. Vui l??ng th??? l???i!")
            }
        }
    })
}
function transferMoney() {
    chosenATMCode = document.getElementById("choseAtmId").value
    atms.forEach(currentATM => {
        if (currentATM.code == chosenATMCode) {
            currentaddressATM = currentATM.address
            if (currentLoginCardNumber != undefined) {
                let cardReceiver = document.getElementById("receiver").value
                amountToSend = document.getElementById("amountToSend").value

                let isCardReceiverValid = currentATM.isCardNumberReceiverValid(cardReceiver)
                let isAmoutToSendValid = currentATM.isAmountValid(amountToSend)


                if (isCardReceiverValid && isAmoutToSendValid) {
                    currentATM.tranferMoney(creditCards, cardReceiver, amountToSend).then(resultTranfer => {
                        currentReceiverCardNumber = cardReceiver
                        alert("Giao d???ch th??nh c??ng!")
                        currentAmount = currentAmount - amountToSend
                        document.getElementById("amount").innerHTML = "S??? d?? t??i kho???n c???a b???n l??:" + " " + ":" + " " + currentAmount + "VN??"
                        persons.forEach(currentReceivePerson => {
                            if (currentReceivePerson.id == resultTranfer.personID) {
                                currentReceiveName = currentReceivePerson.name
                            }
                        })
                        currentATM.tranferHistories('transfer')

                    })
                    .catch(errorTranfer => {
                        alert("T??i kho???n c???a b???n kh??ng ????? ????? th???c hi???n giao d???ch n??y!")
                    })
                } else {
                    alert("Giao d???ch kh??ng th??nh c??ng!")
                }
            }
        }
    })
}
function widthDrawMoney() {
    let chosenATMCode = document.getElementById("choseAtmId").value
    atms.forEach(currentATM => {
        if (currentATM.code == chosenATMCode) {
            currentaddressATM = currentATM.address
            if (currentLoginCardNumber != undefined) {
                amountToWidthDraw = document.getElementById("amountToWithDraw").value
                let pin = document.getElementById("pin").value

                let isAmountToWidthDrawValid = currentATM.isAmountValid(amountToWidthDraw)
                let isPINValid = currentATM.isPINValid(pin)

                if (isAmountToWidthDrawValid && isPINValid) {

                    currentATM.widthDrawMoney(pin, amountToWidthDraw).then(resultWidthDraw => {
                        alert("R??t ti???n th??nh c??ng!")
                        currentAmount = currentAmount - amountToWidthDraw
                        document.getElementById("amount").innerHTML = "S??? d?? t??i kho???n c???a b???n l??:" + " " + ":" + " " + currentAmount + "VN??"
                        currentATM.tranferHistories('withDraw')
                    }).catch(err => {
                        alert("T??i kho???n c???a b???n kh??ng ?????!")
                    })
                } else {
                    alert("R??t ti???n kh??ng th??nh c??ng")
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
                let oldPin = document.getElementById("oldPin").value
                let newPin = document.getElementById("newPin").value
                let reNewPin = document.getElementById("reNewPin").value

                let isOldPinValid = currentATM.isPINValid(oldPin)
                let isNewPinValid = currentATM.isPINValid(newPin)
                let isReNewPinValid = currentATM.isPINValid(reNewPin)

                if (isOldPinValid && isNewPinValid && isReNewPinValid) {
                    currentATM.changePIN(oldPin, newPin).then(() => {
                        currentPIN = newPin
                        alert("?????i m?? pin th??nh c??ng!")


                    }).catch(errorPin => {
                        alert("M?? PIN m???i kh??ng ???????c tr??ng v???i m?? PIN hi???n t???i")
                    })
                } else {
                    alert("?????i m?? pin kh??ng th??nh c??ng!")
                }
            }
        }
    })
}
function fill() {
    document.getElementById("choseAtmId").defaultValue = "TCB-ATM"
    document.getElementById("cardLogin").defaultValue = "0123456789122"
    document.getElementById("PINLogin").defaultValue = "123789"

}
