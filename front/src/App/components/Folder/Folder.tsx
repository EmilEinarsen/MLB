import React from 'react'
import { Hidden, Grid, Box, Fab } from '@material-ui/core'
import List from '../List'
import Document from '../Document'
import './Folder.sass'
import ListToolbar from '../ListToolbar'
import AlphabeticalSlider from '../AlphabeticalSlider'
import { group } from '../../../Helpers'
import { Affix } from 'antd'
import { Add, LoopRounded } from '@material-ui/icons'
import FabBox from '../FabBox'

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
		addDoc: () => void
		editDoc: () => void
		isMounted: any
		reload: () => void
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
		addDoc,
		editDoc,
		isMounted,
		reload
	} 
}) =>
	<>
		<Grid item xs={11} md={6} className="list" ref={setListContainer} style={{ maxHeight: 'calc( 100vh - 50px )', position: 'relative' }}>
			<Grid xs={12}>
				<Box py={4}>
					<Affix 
						ref={isMounted}
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
			<FabBox>
				<Fab onClick={reload} color="primary" size="small">
					<LoopRounded />
				</Fab>
				<Fab onClick={addDoc} color="primary" size="small">
					<Add />
				</Fab>
			</FabBox>
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
			>
				<Document 
					file={files.find((file => file.id === selectedFile))}
					props={{ editDoc }} 
				/>
			</Grid>
		</Hidden>
	</>

export default Folder
