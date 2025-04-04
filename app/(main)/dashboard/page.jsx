import FeatureAssistants from "../../_components/FeatureAssistants";
import History from "../../_components/History";
import Feedback from "../../_components/Feedback";

export default function Dashboard  (){

    return (
        <div >
        
        <FeatureAssistants/>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10 mt-20">
            <History/>
            <Feedback/>

        </div>

        </div>  
    )
}