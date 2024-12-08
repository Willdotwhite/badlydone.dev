# Data Science Experiment

## I Don't Understand Data Science

Data Science: I don't know how to do it. I get the concepts, I have a hazy memory of various statistics classes from a
decade or two ago, and I've even brushed up on how a lot of the tech required for a machine learning platform to run
models and make inference at scale.

But I don't know how to _do_ the Data Science process; with programming tasks, I've understand how to break down work
into smaller chunks, and I have a (for wont of a better word) vibe for what does and doesn't make sense. I can look at
the debugger and have a feel for if something doesn't add up. I have no idea how to look at the results of some :
sparkle: maths :sparkle: and think "Ok, this does(n't) make sense, so next I'll do..." something, I guess.

And I want to learn that - my team is building out a Data Science platform from scratch, and I'd love to have more than
just a theoretical understanding of how this all works. I don't expect to be writing any of the actual model logic
itself, but I'd be able to ask much more insightful questions if I had some experience with the process of getting to an
answer.

So let's remedy that shall we?

## The Game Maker's Toolkit Patron Jam

I'm a member of the amazing Game Maker's Toolkit (GMTK) Patron community on Discord. This December the community are
running a seven day game jam (think 'hackathon where everyone makes a game to a theme'), with a theme voted for by the
community - and, uhh, picked by me!

Link: https://itch.io/jam/gmtk-patreon-2024

Well, that's not quite right; I've been running the theme submission/voting website (on this very
site! https://themes.badlydone.dev/), and because I won't be participating in the jam itself I'll be the one to announce
which theme has won the voting. I won't be picking my favourite theme or anything, but just announcing which theme was
the best as decided by community voting.

One small problem: the voting system we picked was... suboptimal.

We allowed everything to submit up to three themes - come the end of the submission window, we have 223 themes under
consideration. We build a ranked voting system where every participant gets a deterministically random set of ten themes
from the pool, and they rank them from best to worst.

[NOTE: Detail on how voting works]

> ## What Do You Mean By "Theme" Anyway?
> ## What Do You Mean By "Theme" Anyway?
>
> The theme for a game jam is the inspiration for the games that people are making - it can be basically anything, but
> the best themes straddle the line between "vague enough to give developers creative control" and "limiting enough that
> it inspires creativity".
>
> For reference, here are the last few themes the annual GMTK jam has used:
> * Built to Scale
> * Roles Reversed
> * Roll of the Dice
> * Joined Together
> * Out of Control
>
> These are all solid themes! Each one has a nugget of inspiration for where your game might go, but they're not so
> prescriptive that you have to make a game in a specific lane or with specific concerns (the much maligned GGJ 2024
> theme "Make Me Laugh" is an example of this; to adhere to the theme, you game might need some element of comedic
> writing, which is one hell of a restriction).
>
> So as human with human brains here, we can evaluate our nascent Data Science efforts by judging the top themes from
> our experiments to judge if they're in the sweet spot of "not too vague to be meaningless" and "not too specific to
> limit freedom".

### Data Problem #1: We had ~120 people voting on ~240 themes

By limiting users to 10 themes to vote across, we've massively limited how many votes each theme can get. For the 200+
themes in the pool, the most votes a specific theme got was _10_.

The average number of votes each theme got was XXX.

As you might imagine, this left me with some pretty suspect numbers.

How do you pick between a theme which gets four 5 star votes and a theme which gets ten votes of 3, 4, 5?

Well, let's start simple and see where that gets us.

## Trying Stuff And Seeing Why It's Garbage

### Attempt The First: Raw Score

Results:

| Theme             | Score | Votes (top: +5, bottom: -4)          |
|-------------------|-------|--------------------------------------|
| Indirect Control  | 25    | 5, 5, 5, 4, 4, 3, 1, 0, -2           |
| Don't Stop        | 23    | 5, 5, 5, 4, 2, 2, 1, 0, -1           |
| No Straight Lines | 22    | 5, 5, 4, 3, 3, 2                     |
| ...               | ...   | ...                                  |
| Bending the rules | 13    | 5, 4, 4                              |
| ...               | ...   | ...                                  |
| (Redacted)        | -27   | 0, 0, -1, -3, -3, -4, -4, -4, -4, -4 |

```
for (theme in themes) {
	theme.score = sumOf(theme.votes[].score)
}

winningTheme = maxOf(themes by score)
```

Get all the votes for each theme, sum them together, take the theme with the highest total.

Quick, simple, easy, and hideously biased.

Why? Well, indulge me a quick sidebar:

### Data Problem #2: The Enormous Range Of Votes Cast

Each voter got their themes in the laziest way I could think of:

```
random = Random(userId)
themes = database.getAllThemes().shuffle(random).subList(0, 10)
```

By using the `userId` to seed the PRNG we should be sure each voter always saw the same ten themes. We assumed this
would lead to a broadly even distribution of votes, which it did:

[GRAPH]

The problem here is that because we have so many themes, there just weren't enough votes to go around. That normal
distribution peaks around 4.5 votes per theme, which just isn't very much information at all.

[Example of two themes and votes cast]

**Summary**: Raw score biased too heavily for themes that just happened to be seen more.

### Attempt The Second: Average Score

High school stats class here I come! Let's try to account for the inconsistent vote totals by calculating the average
score for each theme, and go from there.

The results:

```

```

Hmm. Well those certainly are _different_, but I'm a bit concerned we've gone too far in the other direction; instead of
biasing towards themes that happened to be seen by lots of people, it looks like we're now biasing towards themes that (
by chance) happened to only be seen by a small number of people who really liked the theme.

If all votes had been seen by 10, 20, 50 people, then I'd be a bit more relaxed about this. But two +5 votes defining
the "best theme" doesn't quite add up; we've swung too far in the other direction.

Maybe we can adjust for how many votes each theme got?

### Attempt The Second-Point-Two: Weighted Average Score

```

```

I won't waste your time here; it's like using the average score, but with a multiplier that tries to account for the
very different numbers of votes. But how?

Penalising themes with fewer votes just lead back to the first attempt, where more votes was broadly better. Boosting
themes with fewer votes just exacerbated the issue with average score above, where a few good votes was all that was
needed.

Trying to figure out what a "good" vote was highlighted the two major fallacies I'd not address up until this point:

### Data Problem #3: The Scores Don't Mean Shit

As mentioned at the top, everyone's ranked votes were submitted from +5 to -4 (no, I don't remember why we did this).
The ranked voting system means all the votes are submitted relative to each other; there's no way real way to have
comparable scores between themes (and between people).

What do I mean by that?

If someone gets four brilliant themes in their selection, the scores those brilliant theme will be given are +5, +4, +3,
and +2, and so on.

If someone gets one excellent theme, one ok theme, and a handful of complete duds? You guessed it: +5, +4, +3 and so on.

And even worse: if someone gets one "meh" theme and nine complete stinkers? You better believe those stinkers are
scoring just as highly as someone else's 2nd/3rd/4th votes.

### Data Problem #3.2: You Can't Do Maths On Relative Numbers

I expect any seasoned data scientists reading have been waiting for this clanger to drop for some time now: the numbers
are all relative, I shouldn't be trying to directly compare them. If my 3rd place vote was great but not quite
excellent, and your 3rd place was the ok-ist of a mediocre bunch, why are we trying to equate those votes together?

Moreover, consider this:

```
"theme": "Nothing But Crabs"
"votes": [
	{
		"first": "user-id-1",
		"second": 5
	},
	{
		"first": "user-id-2",
		"second": 3
	},
	{
		"first": "user-id-3",
		"second": 3
	}
]
```

User 1 ranked this theme as their top pick, that's not too troublesome.

Users 2 and 3 voted them in the same place, but... are they the same? I don't think we can say that.

### Attempt I Don't Know Which: Relative Positions Table

When users rank their votes, the scores themselves are meaningless as scores; all they tell us are the order a specific
user rated their themes.

So maybe our definition of "the best theme" is "the theme that was rated above others most consistently"?

This was a bit more involved (read: I had a proper data scientist help me with this), but what we build is this:

| Theme (+1 when row appears above column) | The Other Way | Divide and conquer | Return to Sender | ... |
|------------------------------------------|---------------|--------------------|------------------|-----|
| The Other Way                            | x             | -1, -1, 1          | -1, 1, -1, 1     |     |
| Divide and conquer                       | 1, 1, -1      | x                  | -1               |     |
| Return to Sender                         | 1, -1, 1, -1  | 1                  | x                |     |
| ...                                      |               |                    |                  |     |

For every theme, we calculate how often it appeared _above_ every other theme, regardless of the specific position of
that theme in the list. The thinking being, the theme which comes out on top most consistently against other themes
would be a strong theme suggestion, even if it didn't always get the highest score possible.

What we then do is sum up each row of the table: this gives us a numeric score for how often this theme appeared above
other themes, something something something.

The pseudocode looks like this:

```
dataTable: Map<Pair<String, String>, List<Int>>

for (voteX in allVotesCast) {
    for (voteY in allVotesCast) {
        if (voteX.themeId == voteY.themeId) { continue }

        comparativeVotes = dataTable[voteX.themeId to voteY.themeId]
        comparativeVotes.add(if (voteX.score > voteY.score) 1 else -1)
    }
}

```

This table looks like this:

```
0 = "(16ec8df0-876f-4cdf-96e9-17071950632a, 4aa5d0e0-b5c4-4341-9efe-7949538011e5): [1, -1]"
1 = "(16ec8df0-876f-4cdf-96e9-17071950632a, 5df19fac-e046-4570-a26e-b0f2807d9067): [1, 1]"
2 = "(16ec8df0-876f-4cdf-96e9-17071950632a, be720f3f-dcb8-40f5-8eab-d4c059f9874f): [1]"
3 = "(16ec8df0-876f-4cdf-96e9-17071950632a, bda40ad7-0e66-4102-a41d-4825b99f465f): [1]"
4 = "(16ec8df0-876f-4cdf-96e9-17071950632a, c4c4e931-1c25-4da1-8218-b998c1b61b19): [1]"
5 = "(16ec8df0-876f-4cdf-96e9-17071950632a, 08390b61-b368-49f4-a763-260bc7e579c8): [1]"
6 = "(16ec8df0-876f-4cdf-96e9-17071950632a, 00adf4ab-acec-491a-8e71-ee4677848d04): [1]"
7 = "(16ec8df0-876f-4cdf-96e9-17071950632a, 5148534a-afa4-4779-9b6f-e3d24d27d29a): [1]"
```

So comparing `16ec8df0-876f-4cdf-96e9-17071950632a` to `4aa5d0e0-b5c4-4341-9efe-7949538011e5` ("Stupid applications of
interesting technology" to "Combination"), there is one instance where `16ec` ranked higher than `4aa5` and one instance
where it ranked lower.

When comparing `16ec` to `5df19fac-e046-4570-a26e-b0f2807d9067` ("Out of reach"), 100% of (both) instances where the two
themes appeared on the same list, `16ec` ranked more highly.

The theme that comes out on top compared to the most other themes, most often, seems like a strong contender for the
best theme.

### Data Problem #1 (Again):

Sadly, we just can't get around the fact that limiting each person to ten themes just doesn't give us enough data to
work with. When we calculate `dataTable` and build our grid of comparative checks, we see the most that two themes
appeared in the same list is... 3 times.

Each `comparativeVotes` array is bound for the express checkout, with three items or fewer!

So we can sum each row of the table to find some number that I'm not even sure I understand again.

The theme it gives us?

```

```

Hmm. High average score, but very low total score. It appeared a total of 27 times compared to other themes. Of the 223
themes, the average is 47.

## Attempt The Last: Plackett-Luce model

I'm on shaky ground here; throughout this process a wonderful colleague of mine Hollie was supporting me as I figured
out what questions to ask and how to go about answering them. I was more or less following along, until one morning
Hollie DM'd me saying "Hey, I tried this model I found online, what do you think?"

The best explanation I found of how the Plackett-Luce model works was
by [this post by Statistical Odds & Ends](https://statisticaloddsandends.wordpress.com/2024/04/24/what-is-the-plackett-luce-model/),
which I highly recommend giving a read.

## Conclusion

I still don't really know anything about anything, but I had a good time with this.

Blah.
