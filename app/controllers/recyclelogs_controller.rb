class RecyclelogsController < ApplicationController

def index
    log = Recyclelog.all
    render json: log
end

def newlog
    user = User.find(params[:id])
    log = user.recyclelogs.create(recyclelog_params)
    user.total_points_count += log.amount
    render json: log
end


def create
    log = Recyclelog.create(recyclelog_params)
    render json: log
end

def recyclelog_params
    params["date"] = Time.now
    params.permit(:date, :amount)
end

end