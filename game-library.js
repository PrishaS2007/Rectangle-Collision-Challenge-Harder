function constrain(val, low, high) {
    if (val < low) {
      return low;
    } else if (val > high) {
      return high;
    } else {
      return val;
    }
}