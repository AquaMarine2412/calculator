var Calculator = /** @class */ (function () {
    function Calculator() {
        var _this = this;
        this.calculator = false;
        this.decimal = false;
        this.sign = "";
        this.number1 = "";
        this.number2 = "";
        this.displayNumber = document.getElementById("displayNumber");
        this.displayNumber.innerHTML = "";
        this.displaySign = document.getElementById("displaySign");
        this.displaySign.innerHTML = "";
        this.onButton = document.getElementById("on");
        this.onButton.onclick = function () { return !_this.calculator ? _this._turnOn() : _this._reset(); };
        this.keyboard = document.body;
        this.keyboard.onkeydown = function (e) {
            (e.key === "Enter" && !_this.calculator) && _this._turnOn();
        };
    }
    // TURN ON/OFF/CE
    Calculator.prototype._turnOn = function () {
        this.calculator = true;
        this._reset();
        this._keyboardFunctions();
    };
    Calculator.prototype._reset = function () {
        if (!this.calculator)
            return;
        this.displayNumber.innerHTML = "0";
        this.displaySign.innerHTML = "";
        this.decimal = true;
        this.sign = "";
        this.number1 = "";
        this.number2 = "";
    };
    Calculator.prototype._turnOff = function () {
        this.calculator = false;
        this.displayNumber.innerHTML = "";
        this.displaySign.innerHTML = "";
        this.decimal = false;
        this.sign = "";
        this.number1 = "";
        this.number2 = "";
    };
    // KEYBOARD
    Calculator.prototype._keyboardFunctions = function () {
        var _this = this;
        if (!this.calculator)
            return;
        /////////////////// BUTTONS //////////////////////////
        this.ceButton = document.getElementById("ce");
        this.offButton = document.getElementById("off");
        this.numberButtons = document.querySelectorAll("[data-number]");
        this.signButtons = document.querySelectorAll("[data-operation]");
        this.equalButton = document.getElementById("equal");
        //////////////////////////////// FUNCTIONS /////////////////////
        // OFF/CE BUTTONS FUNCTION
        this.ceButton.onclick = function () { return _this._reset(); };
        this.offButton.onclick = function () { return _this._turnOff(); };
        // NUMERIC BUTTONS FUNCTION
        this.numberButtons.forEach(function (button) {
            button.onclick = function () {
                if (button.innerHTML !== ".")
                    _this._getDisplayNumbers(button.innerHTML);
                else {
                    if (!_this.decimal)
                        return;
                    _this._getDisplayNumbers(button.innerHTML);
                    _this.decimal = false;
                }
            };
        });
        // ARITHMETIC OPERATORS FUNCTION
        this.signButtons.forEach(function (sign) {
            sign.onclick = function () {
                _this._getNumber1();
                _this._getSign(sign.innerHTML);
            };
        });
        // _calculate BUTTON FUNCTION
        this.equalButton.onclick = function () {
            _this._getNumber2();
            _this._calculate(_this.number1, _this.number2);
        };
        // NUM KEY INPUT FUNCTIONS
        this.keyboard.onkeydown = function (e) {
            var numberPattern = /\d+/g;
            var key = e.key;
            key.match(numberPattern) && _this._getDisplayNumbers(key);
            if (key === "+" || key === "-" || key === "*" || key === "/") {
                _this._getNumber1();
                _this._getSign(key);
            }
            else if (key === "Enter") {
                _this._getNumber2();
                _this._calculate(_this.number1, _this.number2);
            }
            else if (_this.decimal && (key === "," || key === ".")) {
                _this.displayNumber.innerHTML === "0" && _this._getDisplayNumbers("0");
                _this._getDisplayNumbers(".");
                _this.decimal = false;
            }
            key === "Escape" && _this._turnOff();
            key === "Backspace" && _this._reset();
        };
    };
    // DISPLAYING NUMBERS 
    Calculator.prototype._getDisplayNumbers = function (numberPressed) {
        if (!this.calculator)
            return;
        if (this.displayNumber.innerHTML === "0" && numberPressed !== ".")
            this.displayNumber.innerHTML = numberPressed;
        else
            this.displayNumber.innerHTML += numberPressed;
        this.displaySign.innerHTML = "";
    };
    // GETTING NUMBER1 AND NUMBER2
    Calculator.prototype._getSign = function (sign) {
        this.sign = sign;
        this.displaySign.innerHTML = sign;
    };
    Calculator.prototype._getNumber1 = function () {
        if (!this.calculator)
            return;
        this.number1 = this.displayNumber.innerHTML;
        this.displayNumber.innerHTML = "";
        this.number2 = this.displayNumber.innerHTML;
        this.decimal = true;
    };
    Calculator.prototype._getNumber2 = function () {
        if (!this.calculator)
            return;
        this.number2 === "" && (this.number2 = this.displayNumber.innerHTML);
        this.decimal = false;
    };
    // CALCULATING
    Calculator.prototype._calculate = function (n1, n2) {
        if (!this.calculator)
            return;
        if (this.number2 === "0" && this.sign === "/")
            this.displayNumber.innerHTML = "ERROR";
        else {
            this.number1 = eval(n1 + this.sign + n2);
            this.displayNumber.innerHTML = this.number1;
            this.number1 = this.number1.toString();
        }
    };
    return Calculator;
}());
