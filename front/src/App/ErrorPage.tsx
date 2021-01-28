import React from 'react'

const ErrorPage = ({ props: { isMounted } }: any) => (
	<div style={{ width: '100vw', height: '100vh', display: 'grid', placeContent: 'center', background: '#F5F5F5' }} ref={isMounted}>
		error
		{/* <Container>
			<Alert variant="danger" style={{ maxWidth: '70ch', fontSize: '1.5em', display: 'grid', gap: '10px' }}>
				<Alert.Heading style={{ fontSize: '1.8em' }}>Something went wrong</Alert.Heading>
				<p>The server responded with an Error. { <Alert.Link onClick={()=>window.location.reload()}>Refresh</Alert.Link> } to retry. If the same Error occurs, try again at a later time.</p>
			</Alert>
		</Container> */}
	</div>
)

export default ErrorPage