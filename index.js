#! /usr/bin/env node
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const calculation = require('./app/date.calculator');
let obj = new calculation();
const args = process.argv;
args.splice(0, 2);
const firstArg = args[0];
const secondArg = args[1];
var test = () => __awaiter(this, void 0, void 0, function* () {
    try {
        let result = yield obj.calc(firstArg, secondArg);
        console.log(result);
    }
    catch (err) {
        console.log(err);
    }
});
test();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxZQUFZLENBQUE7Ozs7Ozs7OztBQUVaLE1BQU8sV0FBVyxXQUFXLHVCQUF1QixDQUFDLENBQUM7QUFDdEQsSUFBSSxHQUFHLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUU1QixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2xCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFMUIsSUFBSSxJQUFJLEdBQUc7SUFDUCxJQUFJLENBQUM7UUFDRCxJQUFJLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEIsQ0FDQTtJQUFBLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7QUFDTCxDQUFDLENBQUEsQ0FBQTtBQUVELElBQUksRUFBRSxDQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIyEgL3Vzci9iaW4vZW52IG5vZGVcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XHJcbid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IGNhbGN1bGF0aW9uID0gcmVxdWlyZSgnLi9hcHAvZGF0ZS5jYWxjdWxhdG9yJyk7XHJcbmxldCBvYmogPSBuZXcgY2FsY3VsYXRpb24oKTtcclxuXHJcbmNvbnN0IGFyZ3MgPSBwcm9jZXNzLmFyZ3Y7XHJcbmFyZ3Muc3BsaWNlKDAsIDIpO1xyXG5jb25zdCBmaXJzdEFyZyA9IGFyZ3NbMF07XHJcbmNvbnN0IHNlY29uZEFyZyA9IGFyZ3NbMV07XHJcblxyXG52YXIgdGVzdCA9IGFzeW5jICgpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IG9iai5jYWxjKGZpcnN0QXJnLCBzZWNvbmRBcmcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH1cclxufVxyXG5cclxudGVzdCgpO1xyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==
