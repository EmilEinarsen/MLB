import React from 'react'
import { Hidden, Grid, Box } from '@material-ui/core'
import List from '../List'
import Document from '../Document'
import './Folder.sass'
import ListToolbar from '../ListToolbar'
import AlphabeticalSlider from '../AlphabeticalSlider'
import { group } from '../../../Helpers'
import { Affix } from 'antd'

interface Props {
	props: {
		files: Doc[],
		dense: boolean,
		toggleDense: () => void,
		secondary: boolean,
		toggleSecondary: () => void,
		content: boolean,
		toggleContent: () => void,
		selectedFile: string,
		listContainer: HTMLElement | null,
		setListContainer: (instance: HTMLDivElement | null) => void
	}
}

const Folder: React.FC<Props> = ({ 
	props: { 
		files,
		dense,
		toggleDense,
		secondary,
		toggleSecondary,
		content,
		toggleContent,
		selectedFile,
		listContainer,
		setListContainer,
	} 
}) =>
	<>
		<Grid item xs={12} md={6} className="list" ref={setListContainer}>
			<Grid xs={12}>
				<Box py={4}>
					<Affix 
						target={() => listContainer}
						offsetTop={30}	
					>
						<ListToolbar props={{
							dense,
							toggleDense,
							secondary,
							toggleSecondary,
							content,
							toggleContent,
						}}/>
					</Affix>
					<List 
						list={group(files)} 
						configuration={{ 
							dense, 
							secondary, 
							content
						}}
					/>
				</Box>
			</Grid>
			<AlphabeticalSlider 
				list={
					Object.keys(group(files)).map((k,i)=>[k,i])
				}
			/>
		</Grid>
		
		<Hidden smDown>
			<Grid 
				item 
				md={6} 
				className="folder-document"
				style={{ 
					overflowY: 'scroll', 
					maxHeight: 'calc( 100vh - 50px )', 
					paddingTop: '50px'
				}}
			>
				<Document file={files.find((file => file.id === selectedFile))} />
			</Grid>
		</Hidden>
	</>

export default Folder
