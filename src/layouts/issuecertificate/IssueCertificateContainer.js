import IssueCertificate from './IssueCertificate'
import { drizzleConnect } from 'drizzle-react'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    SimpleStorage: state.contracts.SimpleStorage,
    TutorialToken: state.contracts.TutorialToken,
    PeonyCertificate: state.contracts.PeonyCertificate,
    drizzleStatus: state.drizzleStatus
  }
}

const IssueCertificateContainer = drizzleConnect(IssueCertificate, mapStateToProps);

export default IssueCertificateContainer
