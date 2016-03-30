/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

//$ tsd query mocha --save --action install
//$ tsd query chai --save --action install

import chai = require('chai');
import calculator = require('../app/date.calculator');


chai.config.includeStack = true;
const expect = chai.expect;
const assert = chai.assert;

describe('date calculator', () => {
    var calc;
    before(function() {
        calc = new calculator();
    })

    it('should return 0 if first and second date are the same', async (done) => {
        var result = await calc.calc('03/03/2016', '03/03/2016');
        expect(result).equal(0);
        done();
    });
    
    it('should return 0 if first and second date are consecutive', async (done) => {
        var result = await calc.calc('03/03/2016', '04/03/2016');
        expect(result).equal(0);
        done();
    });
    
    it('should be 365 when in a leap year', async (done) => {
        var result = await calc.calc('01/01/2016', '01/01/2017');
        expect(result).equal(365);
        done();
    });
    
    it('should be 364 when not in a leap year', async (done) => {
        var result = await calc.calc('01/01/2015', '01/01/2016');
        expect(result).equal(364);
        done();
    });
    
    it('should raise an error when one date is passed', async (done) => {
            try
            {
                await calc.calc('01/01/2015', undefined);
            }
            catch(err){
                expect(err).equal('two date components should be provided in dd/MM/yyyy format!');
                done();
            }
    });
    
    it('should be 19 days', async (done) => {
        var result = await calc.calc('02/06/1983', '22/06/1983');
        expect(result).equal(19);
        done();
    });
    
    it('should be 173 days', async (done) => {
        var result = await calc.calc('04/07/1984', '25/12/1984');
        expect(result).equal(173);
        done();
    });
    
    it('should be 1979 days', async (done) => {
        var result = await calc.calc('03/01/1989', '03/08/1983');
        expect(result).equal(1979);
        done();
    });
    
    
})