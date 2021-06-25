import { Response, Request} from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";

class CreateComplimentsController{

    async handle(request: Request, response: Response){

        const {tag_id, user_receiver, message} = request.body;
        const { user_id } = request;

        const createComplimentService = new CreateComplimentService();

        const compliments = await createComplimentService.execute({
            tag_id,
            user_sender: user_id,
            user_receiver,
            message});

        return response.json(compliments);

    }

}

export { CreateComplimentsController };

