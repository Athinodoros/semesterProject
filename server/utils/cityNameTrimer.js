/**
 * Created by Athinodoros on 5/9/2017.
 */
var fs = require('fs');

function cityNameExtractor(book) {
    var banedWords = new Array("since", 'am i', 'unto', 'where', 'who', 'hast', 'what', 'thou', 'my', "come", 'here', 'lord', 'they',
        'nod', 'because', "as", "at", "an", "so", "do", "but", "she", "he", "it", "to", "in", "oh", "there", "for", "In", "if", "the", "its", "how", "You", "project gutenberg"
        , "there", "me", "however", "suddenly", "not", 'and', 'very', 'that', 'why', 'you', 'this', 'title', 'when', 'with', 'on', 'just', 'after', 'no', 'let', 'would', 'who', 'where', 'we');
    var trimed = [];
    var sanitized = [];
    var stopBeforeTheLicense = "General Terms of Use and Redistributing";
    if (book) {

        if (book.indexOf(stopBeforeTheLicense) >= 0)
            book = book.substring(0, book.indexOf(stopBeforeTheLicense));
        var caps = book.match(new RegExp(/(([\s][A-Z]|^[A-Z])[a-zA-Z]{0,}){1,}/, "g"));
        // console.log(caps)

        if (caps)
            for (var i = 0; i <= caps.length; i++) {
                if (caps[i]) {
                    if (caps[i].startsWith(" ")) {
                        if (caps[i].substring(1).length > 1 && banedWords.indexOf(caps[i].substring(1).toLowerCase()) < 0 && trimed.indexOf(caps[i].substring(1)) < 0) {
                            trimed.push(caps[i].substring(1));
                        }

                    } else if (caps[i].startsWith("\n")) {
                        if (caps[i].substring(1).length > 1 && banedWords.indexOf(caps[i].substring(1).toLowerCase()) < 0 && trimed.indexOf(caps[i].substring(1)) < 0)
                            trimed.push(caps[i].substring(1));
                    } else {
                        if (caps[i].length > 1 && banedWords.indexOf(caps[i].toLowerCase()) < 0 && trimed.indexOf(caps[i]) < 0)
                            trimed.push(caps[i]);
                    }
                }
            }
    }
    return trimed;
}

module.exports = {extractor: cityNameExtractor}
