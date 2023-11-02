import Notes from './Notes';
import noteImg from '../assets/inotebook.svg'
export const Home = (props) => {
    const { showAlert } = props
    return (
   
        <>

            <div className="container-fluid" >
            <h1 className="display-1 pt-5 ps-5 respo"><span style={{ color: "#9C27B0" }}>i</span>Notebook</h1>
            
                <div className="row">
                    <div className="col-md-5">
                    <Notes showAlert={showAlert}/>
                    </div>
                    <div className="col-md-7 d-flex flex-column align-items-center">
                        <img className="img-fluid" style={{ width: "75%" }} src={noteImg} alt="iNotebook" />
                    </div>
                </div>


            </div>
        
        </>
    )
}
export default Home