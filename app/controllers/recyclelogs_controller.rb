class RecyclelogsController < ApplicationController

def recyclelog_params
    params.permit(:user_id, :date, :amount)

end
