import Notes from './Notes';
import noteImg from '../assets/inotebook.svg'
export const Home = (props) => {
    const { showAlert } = props
    return (
   
        <>

            <div className="container-fluid" >
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