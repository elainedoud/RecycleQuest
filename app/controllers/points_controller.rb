class PointsController < ApplicationController

    def index
        points = Point.all 
        render json: points
    end

    def user_points
        points = Point.find_all(:user_id)
        render json: points
    end
    #This user_points controller is not returning anything; need to get this working

    def assign_points
        if Question(:answer) == true
            point = Point.create(point_params)
        end
    end
    #Will likely need to experiment with assign_points method to make sure
    #it's working as expected

    def create
        point = Point.new(point_params)
        render json: point
    end

    def point_params
        params.permit(:user_id, :question_id, :amount)
    end

end
