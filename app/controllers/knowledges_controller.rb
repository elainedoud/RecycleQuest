class KnowledgesController < ApplicationController

    def index
        knowledge = Knowledge.find(params[:id])
        render json: knowledge 
    end

    def show_all
        knowledges = Knowledge.all
        render json: knowledges 
    end

    def create
        knowledge = Knowledge.new(knowledge_params)
        render json: knowledge
    end

    def knowledge_params
        params.permit(:character_name, :knowledge_blurb)
    end

end
