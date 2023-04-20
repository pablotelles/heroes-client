import moment from "moment/moment";

export function calculateAge(date) {
    // Convert the input date to a Moment.js object
    const birthday = moment(date);
    // Calculate the difference between the birthday and the current date
    const ageInMilliseconds = moment().diff(birthday);
    // Convert the age to years
    const ageInYears = moment.duration(ageInMilliseconds).asYears();
    // Round the age to two decimal places
    const roundedAge = ageInYears.toFixed(0);
    // Return the age as a string
    return roundedAge;
}

export function calculeteXpKnight(age) {
    if (age < 7) {
      return 0;
    } else {
      return Math.floor((age - 7) * Math.pow(22, 1.45));
    }
}

export function calculeteAttack(knight) {
    const modValues = [-2,-2,-2,-2,-2,-2,-2,-2,-1,-1,0,0,1,1,1,2,2,2,3,3];
    const equippedWeapon = knight.weapons.length ? knight.weapons.find(weapon => weapon.equipped) : 0;
    const keyAttr = knight.attributes[knight.keyAttribute]
    const modIndex = () => {
      if (keyAttr < 0) return 0
      if (keyAttr >= 20) return 19
      return keyAttr
    }
    const mod = modValues[modIndex()];
    if (!equippedWeapon)  return 10 + mod + 0;
    return 10 + mod + equippedWeapon.mod;
}
