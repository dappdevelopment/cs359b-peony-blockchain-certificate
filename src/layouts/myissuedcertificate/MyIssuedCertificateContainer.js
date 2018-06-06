import MyIssuedCertificate from './MyIssuedCertificate'
import { drizzleConnect } from 'drizzle-react'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    PeonyCertificate: state.contracts.PeonyCertificate,
    drizzleStatus: state.drizzleStatus
  }
}

const MyIssuedCertificateContainer = drizzleConnect(MyIssuedCertificate, mapStateToProps);

export default MyIssuedCertificateContainer
