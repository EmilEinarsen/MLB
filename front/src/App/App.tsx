import ThemeProvider from '../Providers/ThemeProvider'
import Main from './Main'

const App: React.FC = () => (
	<ThemeProvider>
		<Main />
	</ThemeProvider>
)

export default App
