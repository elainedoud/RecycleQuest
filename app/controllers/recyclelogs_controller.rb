class RecyclelogsController < ApplicationController

    def show_recyclelogs
        logs = Recyclelog.includes(:user).where(user_id: user.id)
        render json: logs
    end

def newlog
    log = Recyclelog.new(user_id: user_id, date: Time.now, amount: amount)
    User.total_points_count += amount
    render json: log
end

def create
    log = Recyclelog.new(recyclelog_params)
    render json: log
end

def recyclelog_params
    params.permit(:user_id, :date, :amount)
end

end