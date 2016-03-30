/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
//$ tsd query mocha --save --action install
//$ tsd query chai --save --action install
const chai = require('chai');
const calculator = require('../app/date.calculator');
chai.config.includeStack = true;
const expect = chai.expect;
const assert = chai.assert;
describe('date calculator', () => {
    var calc;
    before(function () {
        calc = new calculator();
    });
    it('should return 0 if first and second date are the same', (done) => __awaiter(this, void 0, void 0, function* () {
        var result = yield calc.calc('03/03/2016', '03/03/2016');
        expect(result).equal(0);
        done();
    }));
    it('should return 0 if first and second date are consecutive', (done) => __awaiter(this, void 0, void 0, function* () {
        var result = yield calc.calc('03/03/2016', '04/03/2016');
        expect(result).equal(0);
        done();
    }));
    it('should be 365 when in a leap year', (done) => __awaiter(this, void 0, void 0, function* () {
        var result = yield calc.calc('01/01/2016', '01/01/2017');
        expect(result).equal(365);
        done();
    }));
    it('should be 364 when not in a leap year', (done) => __awaiter(this, void 0, void 0, function* () {
        var result = yield calc.calc('01/01/2015', '01/01/2016');
        expect(result).equal(364);
        done();
    }));
    it('should raise an error when one date is passed', (done) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield calc.calc('01/01/2015', undefined);
        }
        catch (err) {
            expect(err).equal('two date components should be provided in dd/MM/yyyy format!');
            done();
        }
    }));
    it('should be 19 days', (done) => __awaiter(this, void 0, void 0, function* () {
        var result = yield calc.calc('02/06/1983', '22/06/1983');
        expect(result).equal(19);
        done();
    }));
    it('should be 173 days', (done) => __awaiter(this, void 0, void 0, function* () {
        var result = yield calc.calc('04/07/1984', '25/12/1984');
        expect(result).equal(173);
        done();
    }));
    it('should be 1979 days', (done) => __awaiter(this, void 0, void 0, function* () {
        var result = yield calc.calc('03/01/1989', '03/08/1983');
        expect(result).equal(1979);
        done();
    }));
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdGVzdC5jYWxjdWxhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9EQUFvRDtBQUNwRCxrREFBa0Q7Ozs7Ozs7Ozs7QUFFbEQsMkNBQTJDO0FBQzNDLDBDQUEwQztBQUUxQyxNQUFPLElBQUksV0FBVyxNQUFNLENBQUMsQ0FBQztBQUM5QixNQUFPLFVBQVUsV0FBVyx3QkFBd0IsQ0FBQyxDQUFDO0FBR3RELElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztBQUNoQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQzNCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFFM0IsUUFBUSxDQUFDLGlCQUFpQixFQUFFO0lBQ3hCLElBQUksSUFBSSxDQUFDO0lBQ1QsTUFBTSxDQUFDO1FBQ0gsSUFBSSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7SUFDNUIsQ0FBQyxDQUFDLENBQUE7SUFFRixFQUFFLENBQUMsdURBQXVELEVBQUUsQ0FBTyxJQUFJO1FBQ25FLElBQUksTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDekQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMERBQTBELEVBQUUsQ0FBTyxJQUFJO1FBQ3RFLElBQUksTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDekQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsbUNBQW1DLEVBQUUsQ0FBTyxJQUFJO1FBQy9DLElBQUksTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDekQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsdUNBQXVDLEVBQUUsQ0FBTyxJQUFJO1FBQ25ELElBQUksTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDekQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsK0NBQStDLEVBQUUsQ0FBTyxJQUFJO1FBQ3ZELElBQ0EsQ0FBQztZQUNHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDN0MsQ0FDQTtRQUFBLEtBQUssQ0FBQSxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUM7WUFDUCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLDhEQUE4RCxDQUFDLENBQUM7WUFDbEYsSUFBSSxFQUFFLENBQUM7UUFDWCxDQUFDO0lBQ1QsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFPLElBQUk7UUFDL0IsSUFBSSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUN6RCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pCLElBQUksRUFBRSxDQUFDO0lBQ1gsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFPLElBQUk7UUFDaEMsSUFBSSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUN6RCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLElBQUksRUFBRSxDQUFDO0lBQ1gsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFPLElBQUk7UUFDakMsSUFBSSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUN6RCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLElBQUksRUFBRSxDQUFDO0lBQ1gsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUdQLENBQUMsQ0FBQyxDQUFBIiwiZmlsZSI6InRlc3QvdGVzdC5jYWxjdWxhdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzXCIgLz5cclxuXHJcbi8vJCB0c2QgcXVlcnkgbW9jaGEgLS1zYXZlIC0tYWN0aW9uIGluc3RhbGxcclxuLy8kIHRzZCBxdWVyeSBjaGFpIC0tc2F2ZSAtLWFjdGlvbiBpbnN0YWxsXHJcblxyXG5pbXBvcnQgY2hhaSA9IHJlcXVpcmUoJ2NoYWknKTtcclxuaW1wb3J0IGNhbGN1bGF0b3IgPSByZXF1aXJlKCcuLi9hcHAvZGF0ZS5jYWxjdWxhdG9yJyk7XHJcblxyXG5cclxuY2hhaS5jb25maWcuaW5jbHVkZVN0YWNrID0gdHJ1ZTtcclxuY29uc3QgZXhwZWN0ID0gY2hhaS5leHBlY3Q7XHJcbmNvbnN0IGFzc2VydCA9IGNoYWkuYXNzZXJ0O1xyXG5cclxuZGVzY3JpYmUoJ2RhdGUgY2FsY3VsYXRvcicsICgpID0+IHtcclxuICAgIHZhciBjYWxjO1xyXG4gICAgYmVmb3JlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNhbGMgPSBuZXcgY2FsY3VsYXRvcigpO1xyXG4gICAgfSlcclxuXHJcbiAgICBpdCgnc2hvdWxkIHJldHVybiAwIGlmIGZpcnN0IGFuZCBzZWNvbmQgZGF0ZSBhcmUgdGhlIHNhbWUnLCBhc3luYyAoZG9uZSkgPT4ge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBhd2FpdCBjYWxjLmNhbGMoJzAzLzAzLzIwMTYnLCAnMDMvMDMvMjAxNicpO1xyXG4gICAgICAgIGV4cGVjdChyZXN1bHQpLmVxdWFsKDApO1xyXG4gICAgICAgIGRvbmUoKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBpdCgnc2hvdWxkIHJldHVybiAwIGlmIGZpcnN0IGFuZCBzZWNvbmQgZGF0ZSBhcmUgY29uc2VjdXRpdmUnLCBhc3luYyAoZG9uZSkgPT4ge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBhd2FpdCBjYWxjLmNhbGMoJzAzLzAzLzIwMTYnLCAnMDQvMDMvMjAxNicpO1xyXG4gICAgICAgIGV4cGVjdChyZXN1bHQpLmVxdWFsKDApO1xyXG4gICAgICAgIGRvbmUoKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBpdCgnc2hvdWxkIGJlIDM2NSB3aGVuIGluIGEgbGVhcCB5ZWFyJywgYXN5bmMgKGRvbmUpID0+IHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gYXdhaXQgY2FsYy5jYWxjKCcwMS8wMS8yMDE2JywgJzAxLzAxLzIwMTcnKTtcclxuICAgICAgICBleHBlY3QocmVzdWx0KS5lcXVhbCgzNjUpO1xyXG4gICAgICAgIGRvbmUoKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBpdCgnc2hvdWxkIGJlIDM2NCB3aGVuIG5vdCBpbiBhIGxlYXAgeWVhcicsIGFzeW5jIChkb25lKSA9PiB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IGF3YWl0IGNhbGMuY2FsYygnMDEvMDEvMjAxNScsICcwMS8wMS8yMDE2Jyk7XHJcbiAgICAgICAgZXhwZWN0KHJlc3VsdCkuZXF1YWwoMzY0KTtcclxuICAgICAgICBkb25lKCk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgaXQoJ3Nob3VsZCByYWlzZSBhbiBlcnJvciB3aGVuIG9uZSBkYXRlIGlzIHBhc3NlZCcsIGFzeW5jIChkb25lKSA9PiB7XHJcbiAgICAgICAgICAgIHRyeVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBjYWxjLmNhbGMoJzAxLzAxLzIwMTUnLCB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoKGVycil7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoZXJyKS5lcXVhbCgndHdvIGRhdGUgY29tcG9uZW50cyBzaG91bGQgYmUgcHJvdmlkZWQgaW4gZGQvTU0veXl5eSBmb3JtYXQhJyk7XHJcbiAgICAgICAgICAgICAgICBkb25lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBpdCgnc2hvdWxkIGJlIDE5IGRheXMnLCBhc3luYyAoZG9uZSkgPT4ge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBhd2FpdCBjYWxjLmNhbGMoJzAyLzA2LzE5ODMnLCAnMjIvMDYvMTk4MycpO1xyXG4gICAgICAgIGV4cGVjdChyZXN1bHQpLmVxdWFsKDE5KTtcclxuICAgICAgICBkb25lKCk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgaXQoJ3Nob3VsZCBiZSAxNzMgZGF5cycsIGFzeW5jIChkb25lKSA9PiB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IGF3YWl0IGNhbGMuY2FsYygnMDQvMDcvMTk4NCcsICcyNS8xMi8xOTg0Jyk7XHJcbiAgICAgICAgZXhwZWN0KHJlc3VsdCkuZXF1YWwoMTczKTtcclxuICAgICAgICBkb25lKCk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgaXQoJ3Nob3VsZCBiZSAxOTc5IGRheXMnLCBhc3luYyAoZG9uZSkgPT4ge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBhd2FpdCBjYWxjLmNhbGMoJzAzLzAxLzE5ODknLCAnMDMvMDgvMTk4MycpO1xyXG4gICAgICAgIGV4cGVjdChyZXN1bHQpLmVxdWFsKDE5NzkpO1xyXG4gICAgICAgIGRvbmUoKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBcclxufSkiXSwic291cmNlUm9vdCI6Ii4uIn0=
