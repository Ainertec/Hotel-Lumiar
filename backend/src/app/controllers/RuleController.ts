/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import Rule from '../models/Rule';

class RuleController {

    async index(request: Request, response: Response) {
        const rules = await Rule.find({});
        return response.json(rules);
    }

    async store(request: Request, response: Response) {
        const { description, atention } = request.body;

        const rule = await Rule.create({
            description,
            atention
        });

        return response.json(rule);
    }

    async update(request: Request, response: Response) {
        const { description, atention } = request.body;
        const { id } = request.params;

        const rule = await Rule.findOneAndUpdate(
        { _id: id },
        {
            description,
            atention
        },
        { new: true },
        );

        return response.json(rule);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        await Rule.findOneAndRemove({ _id: id });

        return response.status(200).send();
    }
}

export default new RuleController();
