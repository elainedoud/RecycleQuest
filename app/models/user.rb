class User < ApplicationRecord

    has_many :points
    has_many :questions, through: :points

end