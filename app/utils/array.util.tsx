// for some reasons i am not able to revese a array using .reverse() method
// thats why i write it
export function reverseArr(input: Array<any>) {
  var ret = [];
  for (var i = input.length - 1; i >= 0; i--) {
    ret.push(input[i]);
  }
  return ret;
}
