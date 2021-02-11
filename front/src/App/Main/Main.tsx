import React from 'react'
import Navbar from '../components/Navbar'
import Folder from '../components/Folder'
import { navigation } from '../../Providers/PageProvider'
import { Grid, Container, Box } from '@material-ui/core'
import './Main.sass'
import Selected from '../components/Selected'

interface Props {
	props: {
		page: navigation
		setPage: () => void
		pages: Page[]
		files: Doc[]
		selectedFile: string
		refMounted: any
		reload: () => void
	}
}

const Main: React.FC<Props> = ({ 
	props: { 
		page, 
		setPage, 
		pages,
		files,
		selectedFile,
		refMounted,
		reload
	} 
}) => (
	<Box className="main-container">
		<Container>
			<Box mb={4}>
				<Grid container spacing={8}>
					{ page === navigation.folder && 
						<Folder props={{ files, selectedFile, refMounted, reload }} /> 
					}
					{ page === navigation.selected && 
						<Selected file={files.find(file=>file.id===selectedFile)} props={{refMounted}} /> 
					}
				</Grid>
			</Box>
		</Container>
		<Navbar props={{ page, pages, setPage }} />
	</Box>
)

export default Main
