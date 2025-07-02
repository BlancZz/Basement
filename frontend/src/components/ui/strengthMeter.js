import React from 'react';
// import zxcvbn from 'zxcvbn';

const StrengthMeter = ({ score }) => {
  //   const testResult = zxcvbn(password);
  // score is multiplied by 100 and divided by 4

  const createPassLabel = () => {
    switch (true) {
      case score < 10:
        return 'Loveless';
      case score < 50:
        return 'Pathetic';
      case score < 200:
        return 'Weak';
      case score < 500:
        return 'Yowai mo';
      case score < 1000:
        return 'Getting there';
      case score < 2500:
        return 'Good effort';
      case score < 5000:
        return 'Keep going!';
      case score < 7500:
        return 'You got this!!';
      case score < 10000:
        return 'Almost :D';
      case score < 20000:
        return "<3 that's enough :3";
      case score >= 20000:
        return '<3 ily';
      default:
        return '';
    }
  };

  const funcProgressColor = () => {
    switch (true) {
      case score < 10:
        return '#fef0f4';
      case score < 50:
        return '#fee0ea';
      case score < 200:
        return '#fecedd';
      case score < 500:
        return '#ffaec8';
      case score < 1000:
        return '#ff8db1';
      case score < 2500:
        return '#ff729f';
      case score < 5000:
        return '#ff5b8f';
      case score < 7500:
        return '#ff417d';
      case score < 10000:
        return '#ff1861';
      case score < 20000:
        return '#ff59c5';
      case score >= 20000:
        return '#4c00ff';
      default:
        return 'none';
    }
  };

  const changePasswordColor = () => ({
    width:
      score <= 2500
        ? `${Math.max(3, (50 * score) / 2500)}%`
        : score <= 10000
        ? `${50 + (30 * (score - 2500)) / 7500}%`
        : score <= 20000
        ? `${80 + (20 * (score - 10000)) / 10000}%`
        : `100%`,
    background: funcProgressColor(),
    height: '7px',
  });

  return (
    <>
      <div className="progress" style={{ height: '7px', width: '46vw' }}>
        <div className="progress-bar" style={changePasswordColor()}></div>
      </div>
      <p style={{ color: funcProgressColor() }}>{createPassLabel()}</p>
    </>
  );
};

export default StrengthMeter;
