
Trie = function(){
  this.characters = {};
};

Trie.prototype.learn = function(word, index){
  // This function should add the given word,
  // starting from the given index,
  // to this Trie.

  // It will be recursive.  It will tell
  // the correct child of this Trie to learn the word
  // starting from a later index.

  // Consider what the learn function should do
  // when it reaches the end of the word?
  // A word does not necessarily end at a leaf.
  // You must mark nodes which are the ends of words,
  // so that the words can be reconstructed later.
  if (index === undefined) {
    index = 0;
  }
  if (word.length === index) {
    // if you're off the end of the word, make is word true
    this.isWord = true;
  } else {
    if (this.characters[word[index]] === undefined) {
      this.characters[word[index]] = new Trie();
      this.characters[word[index]].learn(word, index + 1);
    } else {
      this.characters[word[index]].learn(word, index + 1);
    }
  }

};

Trie.prototype.getWords = function(words, currentWord){
  // This function will return all the words which are
  // contained in this Trie.
  // it will use currentWord as a prefix,
  // since a Trie doesn't know about its parents.
  currentWord = currentWord || '';
  words = words || [];

  if (this.isWord) {
    words.push(currentWord);
  }
  for (var letter in this.characters) {
    var nextWord = currentWord + letter;
    this.characters[letter].getWords(words, nextWord);
  }
  return words;
      // if this.isWord,
      // concatenate all keys to word
      // push word into words

};

Trie.prototype.find = function(word, index){
  // This function will return the node in the trie
  // which corresponds to the end of the passed in word.

  // Be sure to consider what happens if the word is not in this Trie.
  if (index === undefined) {
    index = 0;
  }

  var node = this.characters[word[index]];
  if (node) {
    if(word.length - 1 === index) {
      return node;
    } else {
      return node.find(word, index + 1);
    }
  }
};

Trie.prototype.autoComplete = function(prefix){
  // This function will return all completions
  // for a given prefix.
  // It should use find and getWords.

  var node = this.find(prefix);

  if (node) {
    var suffixes = node.getWords();

    var wholeWords = suffixes.map(function(suffix) {
      return prefix + suffix;
    });

    return wholeWords;
  } else {
    return [];
  }


};

try{
  module.exports = Trie
} catch(e){

}