class Question < ApplicationRecord

    has_many :points
    has_many :users, through: :points

end
