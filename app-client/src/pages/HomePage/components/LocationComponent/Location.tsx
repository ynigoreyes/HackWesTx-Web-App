import * as React from 'react'

class Location extends React.Component<{}, {}> {
  constructor(props) {
    super(props)
  }

  public render(): JSX.Element {
    return (
      <main>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.5368089885874!2d-101.90186218476063!3d33.59137368073379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86fe0d5b26815519%3A0xa2ea347b30a4d9b8!2sTexas+Tech+Innovation+Hub!5e0!3m2!1sen!2sus!4v1531765026492" style={{border: "0", height: "350px", width: "100%"}} />
      </main>
    )
  }
}

export default Location
