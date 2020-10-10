console.log('hello world')
// assumes 2 states for every contraction
// works on a single string

// find all the hits: model -> string -> hits[]
//  for every pair in model
//  do a regexp match to find all in string, start, end, length - return array
// work out the states: hits[] -> states[]
//  this should be binary states for N bits where N = |hits|
// interpolate the states: hits[] -> states[] -> string[]
//  take a hit and a state
//  expose contract all, expand all, all states
