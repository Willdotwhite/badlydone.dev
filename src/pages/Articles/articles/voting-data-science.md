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

One small problem: the voting system we picked was... suboptimal.

Well, kind of.

We allowed everything to submit up to three themes - come the end of the submission window, we have 223 themes under
consideration. We build a ranked voting system where every participant gets a deterministically random set of ten themes
from the pool, and they rank them from best to worst. We had ~130 people vote, each on 10 themes at a time.

Allowing three themes per person (which Amit, the brains behind the voting system, warned would be a problem) gave us
way too many options with not enough votes to go around. Once we had three themes per person, limiting each voter to 10
themes artificially limited how many votes we could spread around. Similar problem to before; a lack of enough data.

### Data Problem #1: We had ~120 people voting on ~240 themes

By limiting users to 10 themes to vote across, we've massively limited how many votes each theme can get. For the 200+
themes in the pool, the most votes a specific theme got was _11_.

The **mean** number of votes each theme got was 5.8 - which, honestly, was more than I'd expected from having so many
themes in scope. As you might imagine, this left me with some pretty suspect numbers.

How do you pick between a theme which gets four 5-star votes and a theme which gets ten votes of 3, 4, 5?

Well, let's start simple and see where that gets us.

---

## Trying Stuff And Seeing Why It's Garbage

### Attempt The First: Raw Score

Approach:

```kotlin
for (theme in themes) {
    theme.score = theme.votes.sumOf { it.score }
}

val winningTheme = themes.maxBy { it.score }
```

Results:

| Theme                         | Score | Votes (top: +5, bottom: -4)              |
|-------------------------------|-------|------------------------------------------|
| Indirect Control              | 25    | 5, 5, 5, 4, 4, 3, 1, 0, -2               |
| Don't Stop                    | 23    | 5, 5, 5, 4, 3, 2, 2, 1, 0, -1, -3        |
| The Other Way                 | 23    | 5, 5, 5, 4, 2, 1, 1                      |
| Fight Without Attack Buttons  | 22    | 5, 5, 5, 4, 3, 2, -1, -1                 |
| A New Twist On An Old Classic | 22    | 5, 5, 4, 4, 3, 1, 2, -1                  |
| ...                           | ...   | ...                                      |
| Bending the rules             | 18    | 5, 5, 4, 4                               |
| Combination                   | 16    | 5, 4, 4, 3                               |
| ...                           | ...   | ...                                      |
| (Redacted)                    | -30   | 0, 0, -1, -3, -3, -3, -4, -4, -4, -4, -4 |


Get all the votes for each theme, sum them together, take the theme with the highest total.

Quick, simple, easy, and hideously biased.

Why? Well, indulge me a quick sidebar:

> ### Data Problem #2: The Enormous Range Of Votes Cast
>
> Each voter got their themes in the laziest way I could think of:
>
> ```
> random = Random(userId)
> themes = database.getAllThemes().shuffle(random).subList(0, 10)
> ```
>
> By using the `userId` to seed the PRNG we should be sure each voter always saw the same ten themes. We assumed this
> would lead to a broadly even distribution of votes, which it did:
>
> ![A normal distribution that highly skews to 5 votes per theme](/articles/number-of-votes-per-theme.png "Number of votes per theme")
>
> The problem here is that because we have so many themes, there just weren't enough votes to go around. That normal
> distribution peaks around 4.5 votes per theme, which just isn't very much information at all.
>
**TLDR: Because the themes have wildly different numbers of votes, the raw score biased too heavily for themes that
just happened to be seen more.**

Which is obvious, right? If we look at "Bending the rules" or "Combination" those two themes both had good scores, they
just didn't get very many of them. That's a flaw with the voting system, where those lucky themes seen more often have
the bias in their favourite.

Let's try something else...

---

### Attempt The Second: Average Score

High school stats class here I come! Let's try to account for the inconsistent vote totals by calculating the average
score for each theme, and go from there.

The results:

| Theme                        | Average Score | # Of Votes |
|------------------------------|---------------|------------|
| Bending the rules            | 4.5           | 4          |
| Combination                  | 4             | 4          |
| Third Time's a Charm         | 4             | 3          |
| ...                          | ...           | ...        |
| The Other Way                | 3.285         | 7          |
| Indirect Control             | 2.777         | 9          |
| Fight Without Attack Buttons | 2.75          | 8          |
| Don't Stop                   | 2.091         | 11         |
| ...                          | ...           | ...        |
| (Redacted)                   | -2.7272727    | 11         |

Hmm. Well those certainly are _different_, but I'm a bit concerned we've gone too far in the other direction; instead of
biasing towards themes that happened to be seen by lots of people, it looks like we're now biasing towards themes that
(by chance) happened to only be seen by a small number of people who really liked the theme.

If all votes had been seen by 10, 20, 50 people, then I'd be a bit more relaxed about this. But two or three +5 votes
defining the "best theme" doesn't quite add up; we've swung too far in the other direction.

Maybe we can adjust for how many votes each theme got? Multiply the average up or down a bit?

Let's try something else...

---

### Attempt The Second-Point-Two: Weighted Average Score

[TABLE REDACTED BECAUSE IT WAS POINTLESS]

I won't waste your time here; it's like using the average score, but with a multiplier that tries to account for the
very different numbers of votes. How, you ask?

Penalising themes with fewer votes just lead back to the first attempt, where more votes was broadly better. Boosting
themes with fewer votes just exacerbated the issue with average score above, where a few good votes was all that was
needed. Trying to corral towards the median just left us with a whole bunch of the middling themes not getting penalised
in either direction.

Trying to figure out what a "good" vote was highlighted the two major fallacies I'd not addressed up until this point:

> ### Data Problem #3: The Scores Don't Mean Shit
>
> As mentioned at the top, everyone's ranked votes were submitted from +5 to -4 (no, I don't remember why we did this).
> The ranked voting system means all the votes are submitted relative to each other; there's no way real way to have
> comparable scores between themes (and between people).
>
> What do I mean by that?
>
> If someone gets four brilliant themes in their selection, the scores those brilliant theme will be given are +5, +4,
> +3, and +2, and so on.
>
> If someone gets one excellent theme, one ok theme, and a handful of complete duds? You guessed it: +5, +4, +3 and so
> on again.
>
> And even worse: if someone gets one "meh" theme and nine complete stinkers? You better believe those stinkers are
> scoring just as highly as someone else's 2nd/3rd/4th votes.

> ### Data Problem #3.2: You Can't Do Maths On Relative Numbers
>
> I expect any seasoned data scientists reading have been waiting for this clanger to drop for some time now: the
> numbers are all relative, I shouldn't be trying to directly compare them. If my 3rd place vote was great but not quite
> excellent, and your 3rd place was the ok-ist of a mediocre bunch, why are we trying to equate those votes together?
>
> Moreover, consider this:
>
> ```
> "theme": "Nothing But Crabs"
> "votes": [
> 	{
> 		"first": "user-id-1",
> 		"second": 5
> 	},
> 	{
> 		"first": "user-id-2",
> 		"second": 3
> 	},
> 	{
> 		"first": "user-id-3",
> 		"second": 3
> 	}
> ]
> ```
>
> User 1 ranked this theme as their top pick, that's not too troublesome. We can confidently say "That's the favourite
> theme User 1 had in their selection". Good stuff.
>
> Users 2 and 3 voted "Nothing But Crabs" in the same place, but... are they the same? I don't think we can say that.
> As mentioned in Data Problem #3, your third place theme and my third place theme are in two totally different frames
> of reference.

There's no way to directly compare the scores themselves. Perhaps we can use the _positions_ of themes to evaluate which
ones were more popular?

Let's try something else...

---

### Attempt I Don't Know Which: Relative Positions Table

(Fun fact! This may or may not also be a naive implementation of
a [Bradley-Terry model](https://en.wikipedia.org/wiki/Bradley%E2%80%93Terry_model). I'm honestly not sure.)

When users rank their votes, the scores themselves are meaningless as scores; all they tell us are the order a specific
user rated their themes.

So maybe our definition of "the best theme" could be "the theme that was rated above others most consistently"!

If we compare every theme against every other theme ("pairwise comparisons"), we could calculate which specific theme
appeared above most other themes most of the time. If we loop over all the themes and compare the position scores they
received **as compared to other themes in the same collection of votes**, we could build a table that shows us how often
one theme was preferred over another.

This was a bit more involved (read: I had a proper data scientist help me with this), but what we built is this:

| Theme (+1 when row appears above column) | The Other Way | Divide and conquer | Return to Sender | ... |
|------------------------------------------|---------------|--------------------|------------------|-----|
| The Other Way                            | x             | -1, -1, 1          | -1, 1, -1, 1     | ... |
| Divide and conquer                       | 1, 1, -1      | x                  | -1               | ... |
| Return to Sender                         | 1, -1, 1, -1  | 1                  | x                | ... |
| ...                                      | ...           | ...                | ...              | ... |

For every theme, we calculate how often it appeared _above_ every other theme, regardless of the specific position of
that theme in the list. The thinking being, the theme which comes out on top most consistently against other themes
would be a strong theme suggestion, even if it didn't always get the highest score possible.

What we then do is sum up each row of the table: this gives us a numeric score for how often this theme appeared above
other themes, although I'm honestly not sure what specific terms we can nail down for this! At this point in the hazy
world of Data Science, I've completely lost track of what technical terms exist, or if I'm just doing... stuff!

The pseudocode looks like this:

```kotlin
val dataTable: Map<Pair<String, String>, List<Int>> = builtAsThatTableAbove()

for (voteX in allVotesCast) {
    for (voteY in allVotesCast) {
        if (voteX.themeId == voteY.themeId) { continue }

        val comparativeVotes = dataTable[voteX.themeId to voteY.themeId]
        comparativeVotes.add(if (voteX.score > voteY.score) 1 else -1)
    }
}

```

This table looks like this:

(I've reduced the UUIDs down to the first segment for readability)

```
0 = "(16ec8df0, 4aa5d0e0): [1, -1]"
1 = "(16ec8df0, 5df19fac): [1, 1]"
2 = "(16ec8df0, be720f3f): [1]"
3 = "(16ec8df0, bda40ad7): [1]"
4 = "(16ec8df0, c4c4e931): [1]"
5 = "(16ec8df0, 08390b61): [1]"
6 = "(16ec8df0, 00adf4ab): [1]"
7 = "(16ec8df0, 5148534a): [1]"
```

So comparing `16ec8df0` ("Stupid applications of interesting technology") to `4aa5d0e0` ("Combination"), there is one
instance where `16ec8df0` ranked higher than `4aa5d0e0` and one instance where it ranked lower.

When comparing `16ec8df0` to `5df19fac` ("Out of reach"), 100% of (both) instances where the two
themes appeared on the same list, `16ec8df0` ranked more highly.

The theme that comes out on top compared to the most other themes, most often, seems like a strong contender for the
best theme.

In order to convert that concept (and also the variably-lengthed arrays of +1s and -1s) into a sortable format, we can
calculate a total score for each theme in the following way:

```kotlin
// This approach isn't very Kotlin-esque, but it's a lot easier to read
for ((themeIds, arrayOfOffsets) in comparativeVotes) {
    // [Do some basic data initialisation stuff]

    val themeUnderEvaluation = themeIds.first // In that block above, note that the key is the (theme, theme) tuple!

    // Build up a running total of the theme scores;
    // Because the number of times each theme was compared varies, we need to normalise the score to balance
    // between themes with many offsets and themes with only a few
    val normalisedOffsetScore = arrayOfOffsets.sum().toFloat() / arrayOfOffsets.size.toFloat()
    scores[themeUnderEvaluation] = scores[themeUnderEvaluation] + normalisedOffsetScore
}

```

### Data Problem #1 (Again):

Sadly, we just can't get around the fact that limiting each person to ten themes just doesn't give us enough data to
work with. When we calculate `dataTable` and build our grid of comparative checks, we see the most that two themes
appeared in the same list is... 4 times.

Each `comparativeVotes` array is bound for the express checkout, with four items or fewer!

The results:

| Theme                                                     | Relative Position Score | How many comparisons? | Votes (scale: +5 to -4) | (Total Score) | (Average Score) |
|-----------------------------------------------------------|-------------------------|-----------------------|-------------------------|---------------|-----------------|
| Bending the rules                                         | 0.882                   | 34                    | 5, 5, 4, 4              | 18            | 4.5             |
| Combination                                               | 0.781                   | 32                    | 5, 4, 4, 3              | 16            | 4               |
| Third Time's a Charm                                      | 0.760                   | 25                    | 5, 4, 3                 | 12            | 4               |
| Cooperate with your enemy                                 | 0.714                   | 35                    | 5, 4, 4, 2              | 15            | 3.75            |
| Dreams and Reality                                        | 0.706                   | 34                    | 5, 5, 3, 2              | 15            | 3.75            |
| Out of Space                                              | 0.636                   | 33                    | 5, 5, 2, 1              | 13            | 3.25            |
| It's not your turn                                        | 0.630                   | 27                    | 5, 3, 2                 | 10            | 3.33            |
| The Other Way                                             | 0.625                   | 56                    | 5, 5, 5, 4, 2, 1, 1     | 23            | 3.29            |
| Start at the End                                          | 0.610                   | 41                    | 5, 5, 3, 3, 0           | 18            | 3.2             |
| Genre vs genre                                            | 0.600                   | 25                    | 5, 4, 1                 | 10            | 3.33            |
| ...                                                       | ...                     | ...                   | ...                     | ...           | ...             |
| "" (I forgot to remove this before the voting went live!) | -0.951                  | 41                    | -3, -4, -4, -4, -4      | -19           | -3.8            |

Hmm. High average score, but low total score.

While the top theme has a decent total and average score, we're seeing some themes that look as though they should score
poorly rating quite highly.

The range of "how many times was one theme compared to all other themes?" was 86 at the high end ("-vania"), down to 9
at the very lowest ("[genre] without [mechanic]"). I have no earthly idea what to do with that information.

---

## Attempt The Last: Plackett-Luce model

I'm on shaky ground here; throughout this process a wonderful colleague of mine Hollie was supporting me as I figured
out what questions to ask and how to go about answering them. I was more or less following along, until one morning
Hollie DM'd me saying "Hey, I tried this model I found online, what do you think?"

That model was the Plackett-Luce model which, when run on some totally incomprehensible R code, produced a theme
ordering that looked broadly the same as the pairwise approach above, but had much more sensible themes at the bottom of
the table.

(The best explanation I found of how the Plackett-Luce model works was
by [this post by Statistical Odds & Ends](https://statisticaloddsandends.wordpress.com/2024/04/24/what-is-the-plackett-luce-model/),
which I highly recommend giving a read.)

Instead of working with pairwise preferences - comparing two themes as though they were the only two things we cared to
vote on ("Red or Blue?") - we can use the Packett-Luce model to handle _listwise_ references.

One of the clever things about this model is that the ranking process happens one step at a time - the most probable
element at position #1 is calculated, and then totally independent of that calculation, the element at position #2 is
calculated based only on the theme data that is remaining.

It doesn't actually make a different to which theme came in position #1 (which at least validates the pairwise table
approach!), but it's interesting to see.

The results:

| Theme                        | Score that ranked us here? |
|------------------------------|----------------------------|
| Bending the rules            | ???                        |
| Combination                  | ???                        |
| Third Time's a Charm         | ???                        |
| Dreams and Reality           | ???                        |
| weird little guys            | ???                        |
| Cooperate with your enemy    | ???                        |
| No Straight Lines            | ???                        |
| The Other Way                | ???                        |
| Out of Space                 | ???                        |
| decay                        | ???                        |
| ...                          | ...                        |
| "" (This came last here too) | ???                        |

(Ed: I still need to run it on my machine and validate the output weights to see how close they all were.)

So while there's a lot more black box magic than I'd care for, it's very gratifying to see that the order is extremely
close to the pairwise list above.

This does make a lot of sense, considering that the Plackett-Luce model is a list-oriented version of the more generic
Bradley-Terry model, which I may or may not have built (or possibly just approximated) in the previous step.

Given that I'm only looking to find the single "best" theme to become the theme for the jam, and one theme in particular
topped the charts in everything but raw score, it seems like we've got a strong candidate: "Breaking the rules".

And, bringing the human factor back into things, what's my gut feel evaluation? It's a good theme!

## The Theme For The First GMTK Patron Jam Is... 'Bending The Rules'!

---

## Conclusion

I had a good time with this - while I don't know if my data science skills are much sharper, I think I'd be
able to try doing this whole theme-ranking thing again in the future at least!

(Not the most ringing endorsement there's ever been, I'll admit)

Oh, and for the next GMTK Patron jam we hold? Either people can vote on as many themes as they want, or I'm finding
a benevolent dictator to just pick their favourite from a shortlist.

[Ed: this is all awful]

Until next time!
