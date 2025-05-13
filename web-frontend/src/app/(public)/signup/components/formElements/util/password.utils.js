const MIN_LENGTH = 8;
const STRENGTH_THRESHOLDS = {
  WEAK: 1,
  FAIR: 2,
  GOOD: 3,
  STRONG: 4,
};

export const strengthLevels = {
  [STRENGTH_THRESHOLDS.WEAK]: { label: "Weak", color: "#F87171", percentage: 25 },
  [STRENGTH_THRESHOLDS.FAIR]: {
    label: "Fair",
    color: "linear-gradient(to right, #F87171, #FBBF24)",
    percentage: 50,
  },
  [STRENGTH_THRESHOLDS.GOOD]: {
    label: "Good",
    color: "linear-gradient(to right, #F87171, #FBBF24, #A3E635)",
    percentage: 75,
  },
  [STRENGTH_THRESHOLDS.STRONG]: {
    label: "Strong",
    color: "linear-gradient(to right, #F87171, #FBBF24, #A3E635, #10B981)",
    percentage: 100,
  },
};

export const getPasswordStrength = (password) => {
  const isMinLength = password.length >= MIN_LENGTH;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);

  if (!isMinLength) return STRENGTH_THRESHOLDS.WEAK;

  const conditionsMet = [hasUppercase, hasNumber, hasSpecialChar].filter(Boolean).length;
  if (conditionsMet === 0) {
    return STRENGTH_THRESHOLDS.WEAK;
  } else if (conditionsMet === 1) {
    return STRENGTH_THRESHOLDS.FAIR;
  } else if (conditionsMet === 2) {
    return STRENGTH_THRESHOLDS.GOOD;
  } else if (conditionsMet === 3) {
    return STRENGTH_THRESHOLDS.STRONG;
  }
};
