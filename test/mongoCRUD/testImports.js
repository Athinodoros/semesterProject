/**
 * Created by Athinodoros on 5/6/2017.
 */

var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
var Promise = require('promise');
var db = require('../../server/dbFacade/facade');
var connector = require('../../server/connector/connector');
chai.use(chaiAsPromised);

// var me = this;
// connector.getdb('testdb').then(function (dbin) {
//     db.conf(dbin)
// });

describe("Test the facade on:", function () {

    before(function (done) {
        if (!db.db)
            connector.getdb('testdb').then(function (dbin) {
                db.conf(dbin);
                done();
            });
    });

    after(function (done) {
        db.close();
        done();
    });

    it('import one item', function (done) {

        db.insertOne(
            "testdb",
            {
                name: 'Thessaloniki3',
                asciiname: 'Thessaloniki3',
                loc: {type: "Point", coordinates: [22.93086, 40.64361]}
            }).then(function (data) {
            data.insertedCount.should.equal(1);
            done();
        })

    });

    it('fetch one item', function (done) {

        db.findOne(
            "testdb",
            {name: 'Thessaloniki3'})
            .then(function (recoveredObject) {
                expect(recoveredObject).to.have.property('name');
                expect(recoveredObject.loc.coordinates[0]).to.equal(22.93086);

                done();
            }).catch(function (err) {
            console.log(err)
            done();
        })

    });


    it('delete one item', function (done) {

        return db.removeOne(
            "testdb",
            {name: 'Thessaloniki3'})
            .then(function (recoveredObject) {
                (recoveredObject.name).should.equal('Thessaloniki3');
                console.log(recoveredObject)


            })
            .then(done())


    });


/*    it('fail', function (done) {

        ("not correct").should.equal('Thessaloniki3');
        done();

    });*/


});

