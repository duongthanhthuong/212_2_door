function LCD () {
    NPNLCD.clear()
    NPNLCD.ShowString("people", 0, 0)
    NPNLCD.ShowNumber(count_people, 0, 1)
}
function opendoor () {
    if (NPNBitKit.ButtonDoorOpen(DigitalPin.P5)) {
        door = 1
    } else {
        door = 0
    }
}
function in2 () {
    if (NPNBitKit.Button(DigitalPin.P0) && count_people < 3) {
        // CHECK LED
        pins.digitalWritePin(DigitalPin.P2, 0)
        // CHECK LED
        pins.digitalWritePin(DigitalPin.P3, 1)
        basic.pause(1000)
        if (door == 1) {
            basic.pause(1000)
            if (ir == 1) {
                count_people += 1
                // CHECK LED
                pins.digitalWritePin(DigitalPin.P2, 1)
                // CHECK LED
                pins.digitalWritePin(DigitalPin.P3, 0)
            }
        }
    } else if (NPNBitKit.Button(DigitalPin.P0) && count_people == 3) {
        pins.analogWritePin(AnalogPin.P8, 66)
        basic.pause(1000)
        pins.analogWritePin(AnalogPin.P8, 0)
    }
}
function outtemp () {
    if (is_button == 0) {
        // CHECK LED = SERVO
        pins.digitalWritePin(DigitalPin.P2, 1)
        // CHECK LED
        pins.digitalWritePin(DigitalPin.P3, 0)
        if (door == 1) {
            // CHECK LED = SERVO
            pins.digitalWritePin(DigitalPin.P2, 0)
            // CHECK LED
            pins.digitalWritePin(DigitalPin.P3, 1)
            basic.pause(500)
            if (ir_out == 1) {
                count_people += -1
                LCD()
                sendout()
                // CHECK LED
                pins.digitalWritePin(DigitalPin.P2, 1)
                // CHECK LED
                pins.digitalWritePin(DigitalPin.P3, 0)
            }
        }
    }
}
function button () {
    key1 = key0
    // đọc nút nhấn 
    key0 = pins.digitalReadPin(DigitalPin.P0)
    if (key1 == key0) {
        if (key_process != key1) {
            key_process = key1
            if (key_process == 0) {
                time_out = 50
                is_button = 1
            }
        } else {
            time_out += -1
            if (time_out <= 0) {
                key_process = 1
                time_out = 50
            }
        }
    }
    basic.pause(20)
}
function doSomething () {
    // CHECK LED
    pins.digitalWritePin(DigitalPin.P2, 0)
    // CHECK LED
    pins.digitalWritePin(DigitalPin.P3, 1)
    basic.pause(1000)
    // CHECK LED
    pins.digitalWritePin(DigitalPin.P2, 1)
    // CHECK LED
    pins.digitalWritePin(DigitalPin.P3, 0)
}
function sendout () {
    serial.writeString("!1:PEOPLE:" + count_people + "#")
    serial.writeString("!1:OUTPEOPLE:1#")
}
function out () {
    // CHECK LED = SERVO
    pins.digitalWritePin(DigitalPin.P2, 1)
    // CHECK LED = SERVO
    pins.digitalWritePin(DigitalPin.P3, 0)
    if (door == 1) {
        // CHECK LED = SERVO
        pins.digitalWritePin(DigitalPin.P2, 0)
        // CHECK LED
        pins.digitalWritePin(DigitalPin.P3, 1)
        basic.pause(500)
        if (ir_out == 1) {
            if (count_people > 0) {
                count_people += -1
            }
            LCD()
            sendout()
            // CHECK LED
            pins.digitalWritePin(DigitalPin.P2, 1)
            // CHECK LED
            pins.digitalWritePin(DigitalPin.P3, 0)
        }
    }
}
function IR_in () {
    if (pins.digitalReadPin(DigitalPin.P6) == 1) {
        ir = 1
    } else if (pins.digitalReadPin(DigitalPin.P6) == 0) {
        ir = 0
    }
}
serial.onDataReceived(serial.delimiters(Delimiters.Hash), function () {
    cmd = serial.readUntil(serial.delimiters(Delimiters.Hash))
    if (cmd == "0") {
        // CHECK LED
        pins.digitalWritePin(DigitalPin.P2, 0)
        // CHECK LED
        pins.digitalWritePin(DigitalPin.P3, 0)
    } else if (cmd == "1") {
        // CHECK LED
        pins.digitalWritePin(DigitalPin.P2, 1)
        // CHECK LED
        pins.digitalWritePin(DigitalPin.P3, 0)
    } else if (cmd == "2") {
        NPNLCD.on()
    } else if (cmd == "3") {
        NPNLCD.off()
    } else if (cmd == "4") {
        pins.analogWritePin(AnalogPin.P8, 200)
    } else if (cmd == "5") {
        pins.analogWritePin(AnalogPin.P8, 0)
    }
})
function sendin () {
    serial.writeString("!1:PEOPLE:" + count_people + "#")
    serial.writeString("!1:INPEOPLE:1#")
}
function _in () {
    if (count_people < 3 && is_button == 1) {
        // CHECK LED
        pins.digitalWritePin(DigitalPin.P2, 0)
        // CHECK LED
        pins.digitalWritePin(DigitalPin.P3, 1)
        basic.pause(500)
        if (door == 1) {
            basic.pause(500)
            if (ir == 1) {
                count_people += 1
                sendin()
                LCD()
                // CHECK LED
                pins.digitalWritePin(DigitalPin.P2, 1)
                // CHECK LED
                pins.digitalWritePin(DigitalPin.P3, 0)
                is_button = 0
            }
        }
    } else if (count_people == 3 && is_button == 1) {
        pins.analogWritePin(AnalogPin.P8, 776)
        basic.pause(1000)
        pins.analogWritePin(AnalogPin.P8, 0)
        is_button = 0
    }
}
function IR_out () {
    if (pins.digitalReadPin(DigitalPin.P4) == 1) {
        ir_out = 1
    } else if (pins.digitalReadPin(DigitalPin.P4) == 0) {
        ir_out = 0
    }
}
let cmd = ""
let time_out = 0
let key0 = 0
let key1 = 0
let ir_out = 0
let door = 0
let is_button = 0
let key_process = 0
let ir = 0
let count_people = 0
// 19 20
NPNLCD.LcdInit()
NPNLCD.ShowString("Xin chao", 0, 0)
count_people = 0
ir = 0
key_process = 1
is_button = 0
// CHECK LED
pins.digitalWritePin(DigitalPin.P2, 1)
// CHECK LED
pins.digitalWritePin(DigitalPin.P3, 0)
// button
pins.setPull(DigitalPin.P0, PinPullMode.PullUp)
basic.forever(function () {
    _in()
    out()
})
basic.forever(function () {
    button()
    IR_in()
    IR_out()
    opendoor()
})
