// If no. of days not defined default to 3 days
const motion = {
  desc: 'Motion',
  days: 10
}

const summons = {
  desc: 'Summons',
  days: 3
}

const noticeOfIntentionToDefend = {
  desc: 'Notice of intention to defend',
  days: 10
}

const summaryOfJudgment = {
  desc: 'Summary of judgment',
  days: 15
}

const warantOfExecution = {
  desc: 'Warrant of execution',
  days: 3
}

const leaveToDefend = {
  desc: 'Leave to defend',
  days: 3
}

const pleaAndCounterClaim = {
  desc: 'Plea and counterclaim',
  days: 20
}

const replicationAndPleaToCounterclaim = {
  desc: 'Replication and plea to counterclaim',
  days: 15
}

const furtherPleadings = {
  desc: 'Further pleadings',
  days: 10
}

const discoveryAndOtherPreTrial = {
  desc: 'Discovery and other pre trial procedures',
  days: 3
}

const trial = {
  desc: 'Trial',
  days: 3
}

const judgementGranted = {
  desc: 'Judgment granted',
  days: 3
}

const applicationForLeaveToAppeal = {
  desc: 'Application for leave to appeal',
  days: 15,
}

const leaveToAppealRefused = {
  desc:  'Leave to appeal refused',
  days: 3
}

const leaveToAppealGranted = {
  desc: 'Leave to appleal granted',
  days: 3
}

const applicationToSCA = {
  desc: 'Application to SCA/CC',
  days: 3
}

const applicationRefused = {
  desc: 'Application refused',
  days: 3
}

const appealDismissed = {
  desc: 'Appeal dismissed',
  days: 3
}

const appealUpheld = {
  desc: 'Appeal upheld',
  days: 3
}

const claimDismissed = {
  desc: 'Claim dismissed',
  days: 3
}

const endOfCase = {
  desc: 'End of case',
  days: 3
}

motion.next = {
  summons
}

summons.next = {
  noticeOfIntentionToDefend
}

noticeOfIntentionToDefend.next = {
  summaryOfJudgment,
  pleaAndCounterClaim
}

summaryOfJudgment.next = {
  warantOfExecution,
  leaveToDefend
}

warantOfExecution.next = {
  endOfCase
}

leaveToDefend.next = {
  pleaAndCounterClaim
}

pleaAndCounterClaim.next = {
  replicationAndPleaToCounterclaim
}

replicationAndPleaToCounterclaim.next = {
  furtherPleadings
}

furtherPleadings.next = {
  discoveryAndOtherPreTrial
}

discoveryAndOtherPreTrial.next = {
  trial
}

trial.next = {
  judgementGranted,
  claimDismissed
}

judgementGranted.next = {
  warantOfExecution,
  applicationForLeaveToAppeal
}

applicationForLeaveToAppeal.next = {
  leaveToAppealRefused,
  leaveToAppealGranted
}

leaveToAppealRefused.next = {
  endOfCase,
  applicationToSCA
}

leaveToAppealGranted.next = {
  appealDismissed,
  appealUpheld
}

appealDismissed.next = {
  warantOfExecution
}

appealUpheld.next = {
  endOfCase
}

applicationToSCA.next = {
  leaveToAppealGranted,
  applicationRefused
}

applicationRefused.next = {
  endOfCase
}

claimDismissed.next = {
  endOfCase,
  applicationForLeaveToAppeal
}

module.exports = {
  motion,
  summons,
  noticeOfIntentionToDefend,
  summaryOfJudgment,
  warantOfExecution,
  leaveToDefend,
  pleaAndCounterClaim,
  replicationAndPleaToCounterclaim,
  furtherPleadings,
  discoveryAndOtherPreTrial,
  trial,
  judgementGranted,
  applicationForLeaveToAppeal,
  leaveToAppealRefused,
  leaveToAppealGranted,
  applicationToSCA,
  applicationRefused,
  appealDismissed,
  appealUpheld,
  claimDismissed,
  endOfCase
}
