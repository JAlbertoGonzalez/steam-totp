const { expect } = require('chai')
const { GetCode } = require('../lib/totp')
const os = require('os')

// Generated randomly
const SecretTest = '7gr27hOkoH/FcveC/CDht2aU0Qs=';
const TimeTest = 1590922625587; // Test are based on this date

describe('totp', () => {
    it('should get correct code', () => {
        const code = GetCode(SecretTest, TimeTest);
        expect(code).equals('F9R52');
    })

    it('should parse date as Date and epoch unix timestamp', () => {
        const TimeTestDate = new Date();
        const UnixTimestamp = TimeTestDate.getTime();

        const code1 = GetCode(SecretTest, TimeTestDate);
        const code2 = GetCode(SecretTest, UnixTimestamp);

        expect(code1).equals(code2);
    })

    it('should always use little endian', () => {
        if (os.endianness() === 'BE') {
            const code = GetCode(SecretTest, TimeTest);
            expect(code).equals('F9R52');
        }
    })

    it('should use current time if date is not passed', () => {
        const CurrentTime = new Date();
        const code1 = GetCode(SecretTest, CurrentTime);
        const code2 = GetCode(SecretTest);
        expect(code1).equals(code2);
    })
})
