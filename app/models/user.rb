class User < ApplicationRecord

    has_many :points
    has_many :questions, through: :points

    has_many :recyclelogs

    attribute :total_points_count, :integer, default: 0
    attribute :last_gem_bonus, :datetime, default: "2023-08-21T08:15:00.000Z"
    attribute :last_daily_bonus, :datetime, default: "2023-08-20T18:55:00.000Z"
    attribute :last_daily_question, :datetime, default: "2023-08-20T18:55:00.000Z"

end
