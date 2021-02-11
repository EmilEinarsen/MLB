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
import MenuDocument, { context } from '../MenuDocument'

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
		editDoc: () => void
		refMounted: any
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
		editDoc,
		refMounted,
		reload
	} 
}) =>
	<>
		<Grid item xs={11} md={6} style={{ maxHeight: 'calc( 100vh - 50px )', position: 'relative' }}>
			<Grid className="list" ref={setListContainer}>
				<AlphabeticalSlider 
					list={ Object.keys(group(files)).map((k,i)=>[k,i]) }
				/>
				<Grid item xs={12}>
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
							props={{ refMounted }}
						/>
					</Box>
				</Grid>
				<FabBox>
					<Fab onClick={reload} color="primary" size="small"><LoopRounded /></Fab>
					<MenuDocument
						transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
						envContext={context.add} 
						altButton={(onClick: any) => 
							<Fab onClick={onClick} color="primary" size="small"><Add /></Fab>
						} 
					/>
				</FabBox>
			</Grid>
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
