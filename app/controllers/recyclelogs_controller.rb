class RecyclelogsController < ApplicationController

def index
    log = Recyclelog.all
    render json: log
end

def newlog
    user = User.find_by(id: params[:id])
    log = Recyclelog.create(recyclelog_params)
   # User.total_points_count += amount
    render json: log
end
#This method is still in progress

def create
    log = Recyclelog.create(recyclelog_params)
    render json: log
end

def recyclelog_params
    params["date"] = Time.now
    params.permit(:user_id, :date, :amount, :id)
end

end