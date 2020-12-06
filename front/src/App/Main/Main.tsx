import React from 'react'
import Navbar from '../components/Navbar'
import Folder from '../components/Folder'
import { navigation } from '../../Providers/PageProvider'
import { Grid, Container, Box } from '@material-ui/core'
import './Main.sass'

interface Props {
	props: {
		page: navigation,
		setPage: () => void,
		pages: Page[]
	}
}

const Main: React.FC<Props> = ({ 
	props: { 
		page, 
		setPage, 
		pages 
	} 
}) => (
	<Box className="main-container">
		<Container>
			<Box mb={4}>
				<Grid container spacing={8}>
					{ page === navigation.folder && <Folder /> }
				</Grid>
			</Box>
		</Container>
		<Navbar props={{ page, pages, setPage }} />
	</Box>
)

export default Main
